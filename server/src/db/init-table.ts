import {
  CreateTableCommand,
  DescribeTableCommand,
  UpdateTimeToLiveCommand,
  ResourceNotFoundException,
} from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from './connection.js';

export async function ensureTable(): Promise<void> {
  const client = getDocClient();

  // Check if table exists
  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`DynamoDB table '${TABLE_NAME}' already exists`);
    return;
  } catch (err) {
    if (!(err instanceof ResourceNotFoundException)) {
      throw err;
    }
  }

  // Create table with GSI1 for username lookup
  console.log(`Creating DynamoDB table '${TABLE_NAME}'...`);
  await client.send(
    new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' },
        { AttributeName: 'SK', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'PK', AttributeType: 'S' },
        { AttributeName: 'SK', AttributeType: 'S' },
        { AttributeName: 'GSI1PK', AttributeType: 'S' },
        { AttributeName: 'GSI1SK', AttributeType: 'S' },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'GSI1',
          KeySchema: [
            { AttributeName: 'GSI1PK', KeyType: 'HASH' },
            { AttributeName: 'GSI1SK', KeyType: 'RANGE' },
          ],
          Projection: { ProjectionType: 'ALL' },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    })
  );

  // Enable TTL on the 'ttl' attribute (for auto-expiring effects)
  await client.send(
    new UpdateTimeToLiveCommand({
      TableName: TABLE_NAME,
      TimeToLiveSpecification: {
        AttributeName: 'ttl',
        Enabled: true,
      },
    })
  );

  // Seed the atomic user ID counter
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: 'COUNTER',
        SK: 'USER_ID',
        currentId: 0,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    })
  );

  console.log(`DynamoDB table '${TABLE_NAME}' created successfully`);
}

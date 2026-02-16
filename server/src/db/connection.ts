import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const TABLE_NAME = process.env.DYNAMODB_TABLE ?? 'FoundationGame';

let docClient: DynamoDBDocumentClient | null = null;

export function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const region = process.env.AWS_REGION ?? 'us-east-1';

    const client = new DynamoDBClient({
      region,
      ...(endpoint ? { endpoint } : {}),
    });

    docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
  }
  return docClient;
}

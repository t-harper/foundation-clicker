import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const TABLE_NAME = process.env.DYNAMODB_TABLE ?? 'FoundationGame';

let docClient: DynamoDBDocumentClient | null = null;
let safeDocClient: DynamoDBDocumentClient | null = null;

function createBaseClient(): DynamoDBClient {
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  const region = process.env.AWS_REGION ?? 'us-east-1';

  return new DynamoDBClient({
    region,
    ...(endpoint ? { endpoint } : {}),
  });
}

export function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    docClient = DynamoDBDocumentClient.from(createBaseClient(), {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
  }
  return docClient;
}

/**
 * Document client that handles numbers > MAX_SAFE_INTEGER.
 * Use for queries that may read items with large numeric values (e.g. game state, prestige).
 */
export function getDocClientSafe(): DynamoDBDocumentClient {
  if (!safeDocClient) {
    safeDocClient = DynamoDBDocumentClient.from(createBaseClient(), {
      marshallOptions: {
        removeUndefinedValues: true,
      },
      unmarshallOptions: {
        wrapNumbers: true,
      },
    });
  }
  return safeDocClient;
}

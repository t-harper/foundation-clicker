import { GetCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { queryItems, userPK } from '../dynamo-utils.js';

export interface ShipRow {
  id: string;
  user_id: number;
  ship_type: string;
  name: string;
  status: string;
  trade_route_id: string | null;
  departed_at: number | null;
  returns_at: number | null;
}

export async function getShips(userId: number): Promise<ShipRow[]> {
  const items = await queryItems(userPK(userId), 'SHIP#');
  return items.map((item) => ({
    id: item.SK.replace('SHIP#', ''),
    user_id: userId,
    ship_type: item.shipType,
    name: item.name,
    status: item.status ?? 'docked',
    trade_route_id: item.tradeRouteId ?? null,
    departed_at: item.departedAt ?? null,
    returns_at: item.returnsAt ?? null,
  }));
}

export async function createShip(
  userId: number,
  shipData: {
    id: string;
    shipType: string;
    name: string;
  }
): Promise<ShipRow> {
  const client = getDocClient();
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: userPK(userId),
        SK: `SHIP#${shipData.id}`,
        shipType: shipData.shipType,
        name: shipData.name,
        status: 'docked',
      },
    })
  );

  return {
    id: shipData.id,
    user_id: userId,
    ship_type: shipData.shipType,
    name: shipData.name,
    status: 'docked',
    trade_route_id: null,
    departed_at: null,
    returns_at: null,
  };
}

export async function updateShipStatus(
  userId: number,
  shipId: string,
  status: string,
  tradeRouteId: string | null,
  departedAt: number | null,
  returnsAt: number | null
): Promise<void> {
  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `SHIP#${shipId}` },
      UpdateExpression: 'SET #status = :status, tradeRouteId = :routeId, departedAt = :departed, returnsAt = :returns',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: {
        ':status': status,
        ':routeId': tradeRouteId,
        ':departed': departedAt,
        ':returns': returnsAt,
      },
    })
  );
}

export async function deleteShip(userId: number, shipId: string): Promise<void> {
  const client = getDocClient();
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: `SHIP#${shipId}` },
    })
  );
}

import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient, TABLE_NAME } from '../connection.js';
import { userPK } from '../dynamo-utils.js';

export interface GameStateRow {
  user_id: number;
  credits: number;
  knowledge: number;
  influence: number;
  nuclear_tech: number;
  raw_materials: number;
  click_value: number;
  current_era: number;
  seldon_points: number;
  total_seldon_points: number;
  prestige_count: number;
  prestige_multiplier: number;
  last_tick_at: number | null;
  total_play_time: number;
  total_clicks: number;
  lifetime_credits: number;
}

function itemToRow(userId: number, item: Record<string, any>): GameStateRow {
  return {
    user_id: userId,
    credits: item.credits ?? 0,
    knowledge: item.knowledge ?? 0,
    influence: item.influence ?? 0,
    nuclear_tech: item.nuclearTech ?? 0,
    raw_materials: item.rawMaterials ?? 0,
    click_value: item.clickValue ?? 1,
    current_era: item.currentEra ?? 0,
    seldon_points: item.seldonPoints ?? 0,
    total_seldon_points: item.totalSeldonPoints ?? 0,
    prestige_count: item.prestigeCount ?? 0,
    prestige_multiplier: item.prestigeMultiplier ?? 1,
    last_tick_at: item.lastTickAt ?? null,
    total_play_time: item.totalPlayTime ?? 0,
    total_clicks: item.totalClicks ?? 0,
    lifetime_credits: item.lifetimeCredits ?? 0,
  };
}

export async function createGameState(userId: number): Promise<GameStateRow> {
  const client = getDocClient();
  const now = Math.floor(Date.now() / 1000);

  const item = {
    PK: userPK(userId),
    SK: 'GAMESTATE',
    credits: 0,
    knowledge: 0,
    influence: 0,
    nuclearTech: 0,
    rawMaterials: 0,
    clickValue: 1,
    currentEra: 0,
    seldonPoints: 0,
    totalSeldonPoints: 0,
    prestigeCount: 0,
    prestigeMultiplier: 1,
    lastTickAt: now,
    totalPlayTime: 0,
    totalClicks: 0,
    lifetimeCredits: 0,
  };

  await client.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
  return itemToRow(userId, item);
}

export async function getGameState(userId: number): Promise<GameStateRow | undefined> {
  const client = getDocClient();
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'GAMESTATE' },
    })
  );

  if (!result.Item) return undefined;
  return itemToRow(userId, result.Item);
}

// Map from snake_case column names (used by callers) to camelCase DynamoDB attribute names
const COLUMN_TO_ATTR: Record<string, string> = {
  credits: 'credits',
  knowledge: 'knowledge',
  influence: 'influence',
  nuclear_tech: 'nuclearTech',
  raw_materials: 'rawMaterials',
  click_value: 'clickValue',
  current_era: 'currentEra',
  seldon_points: 'seldonPoints',
  total_seldon_points: 'totalSeldonPoints',
  prestige_count: 'prestigeCount',
  prestige_multiplier: 'prestigeMultiplier',
  last_tick_at: 'lastTickAt',
  total_play_time: 'totalPlayTime',
  total_clicks: 'totalClicks',
  lifetime_credits: 'lifetimeCredits',
};

export async function updateGameState(
  userId: number,
  data: Partial<Omit<GameStateRow, 'user_id'>>
): Promise<void> {
  const entries = Object.entries(data).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;

  const setExprs: string[] = [];
  const attrNames: Record<string, string> = {};
  const attrValues: Record<string, any> = {};

  for (const [col, val] of entries) {
    const attr = COLUMN_TO_ATTR[col] ?? col;
    const placeholder = `#${attr}`;
    const valuePlaceholder = `:${attr}`;
    attrNames[placeholder] = attr;
    attrValues[valuePlaceholder] = val;
    setExprs.push(`${placeholder} = ${valuePlaceholder}`);
  }

  const client = getDocClient();
  await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userPK(userId), SK: 'GAMESTATE' },
      UpdateExpression: `SET ${setExprs.join(', ')}`,
      ExpressionAttributeNames: attrNames,
      ExpressionAttributeValues: attrValues,
    })
  );
}

export async function updateResources(
  userId: number,
  resources: {
    credits?: number;
    knowledge?: number;
    influence?: number;
    nuclear_tech?: number;
    raw_materials?: number;
  }
): Promise<void> {
  await updateGameState(userId, resources);
}

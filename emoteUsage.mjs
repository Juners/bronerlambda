import {
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

async function getStoredEmoteData() {
  const client = new DynamoDBClient({ region: "eu-west-1" });

  try {
    const scanCommand = new ScanCommand({
      TableName: "lina_emotes_data",
      Limit: 1,
      ScanIndexForward: false,
    });

    const item = (await client.send(scanCommand)).Items[0];
    if (!item) return { twitch: {}, seventv: {} };

    const emoteData = { date: item.date.S, json: item.json.S };

    return JSON.parse(emoteData.json);
  } catch (e) {
    console.error("getStoredEmoteData", e);
    return JSON.stringify(e, null, 2);
  }
}

export async function getEmoteUsage(channelName) {
  const client = new DynamoDBClient({ region: "eu-west-1" });

  let emoteUsage = null;
  try {
    emoteUsage = await getStoredEmoteData(client);
  } catch (e) {
    console.error("getEmoteUsage", e);
    return null;
  } finally {
    client.destroy();
  }

  return emoteUsage;
}

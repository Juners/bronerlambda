import { getEmoteUsage } from "./emoteUsage.mjs";

export async function handler(event) {
  const emoteUsage = await getEmoteUsage();

  return {
    statusCode: 200,
    body: JSON.stringify({ emoteUsage }),
  };
}

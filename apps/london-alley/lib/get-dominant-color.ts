import "server-only";

import { Vibrant } from "node-vibrant/node";

export async function getDominantColor(imageUrl: string) {
  try {
    const vibrant = new Vibrant(imageUrl);
    return (await vibrant.getPalette())?.Vibrant?.hex;
  } catch (error) {
    console.error("error fetching dominant color", error);
  }
}

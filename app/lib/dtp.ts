import { DTP } from "@ontomorph/dtp-sdk";

export const dtp = new DTP({
  apiKey: process.env.DTP_API_KEY!,
});
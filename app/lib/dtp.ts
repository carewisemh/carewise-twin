import { DTP } from "@/lib/ontomorph-sdk";

export const dtp = new DTP({
  apiKey: process.env.DTP_API_KEY!,
});
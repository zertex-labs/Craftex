import { DiscordClient } from "./discord/discord.client.ts";

export const AUTH_CLIENTS = {
  discord: new DiscordClient({
    scope: "identify",
    clientId: Deno.env.get("DISCORD_CLIENT_ID")!,
    clientSecret: Deno.env.get("DISCORD_CLIENT_SECRET")!,
    callbackUrl: Deno.env.get("DISCORD_CALLBACK_URL")!,
  }),
} as const;

export const SUPPORTED_CLIENTS = Object.keys(AUTH_CLIENTS);

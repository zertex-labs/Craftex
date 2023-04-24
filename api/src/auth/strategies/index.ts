import { DiscordClient } from "./discord/discord.client.ts";
import { GitHubClient } from "./github/github.client.ts";

// Strategies mostly from https://github.com/oslabs-beta/DenOAuth

export const AUTH_CLIENTS = {
  discord: new DiscordClient({
    scope: "identify",
    clientId: Deno.env.get("DISCORD_CLIENT_ID")!,
    clientSecret: Deno.env.get("DISCORD_CLIENT_SECRET")!,
    callbackUrl: Deno.env.get("DISCORD_CALLBACK_URL")!,
  }),
  github: new GitHubClient({
    scope: "read:user",
    clientId: Deno.env.get("GITHUB_CLIENT_ID")!,
    clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET")!,
    callbackUrl: Deno.env.get("GITHUB_CALLBACK_URL")!,
  }),
} as const;

export const SUPPORTED_CLIENTS = Object.keys(AUTH_CLIENTS);

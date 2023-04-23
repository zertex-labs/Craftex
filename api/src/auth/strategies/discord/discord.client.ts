import { DiscordStrategy } from "./discord.strategy.ts";

export interface DiscordClientConfig {
  /** The client ID provided by the authorization server. */
  clientId: string;

  /** The client secret provided by the authorization server, if using a confidential client. Best practice to always keep secret in env file. */
  clientSecret: string;

  /** The URI of the client's redirection endpoint. */
  callbackUrl: string;

  // currently only works with scope set to 'identify'
  /** Scopes to request with the authorization request. */
  scope: any; 
}

export class DiscordClient {
  // implements all the methods required to complete OAuth process
  public code = new DiscordStrategy(this);

  // interface values cannot be changed outside of class
  constructor(public readonly config: Readonly<DiscordClientConfig>) {}
}

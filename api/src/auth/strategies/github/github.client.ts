import { GitHubStrategy } from "./github.strategy.ts";

export interface GitHubClientConfig {
  /** The client ID provided by the authorization server. */
  clientId: string;

  /** The client secret provided by the authorization server, if using a confidential client. */
  clientSecret: string;

  /** The URI of the client's redirection endpoint. */
  callbackUrl: string;

  // currently only works with scope set to 'identify'
  /** Scopes to request with the authorization request. */
  scope: any; 
}

export class GitHubClient {
  // implements all the methods required to complete OAuth process
  public code = new GitHubStrategy(this);

  // interface values cannot be changed outside of class
  constructor(public readonly config: Readonly<GitHubClientConfig>) {}
}

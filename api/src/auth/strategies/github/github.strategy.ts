import { GitHubClient } from "./github.client.ts";

// 'https://github.com/login/oauth/authorize?response_type=code&client_id=${your_clientId}&redirect_uri=${your_encoded_redirect_Link}&state=${foobar}&scope=${your_encoded_scope}'

export type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: "User";
  site_admin: boolean;
  name: string;
  company?: unknown;
  blog: string;
  location?: unknown;
  email?: string;
  hireable?: boolean;
  bio: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

export const GITHUB_BASE_URL = "https://github.com/login/oauth";

export abstract class GitHubGrant {
  constructor(protected readonly client: GitHubClient) {}
}

export class GitHubStrategy extends GitHubGrant {
  constructor(client: GitHubClient) {
    super(client);
  }

  /** Builds a URI you can redirect a user to to make the authorization request. */
  createLink = () => {
    // The primary reason for using the state parameter is to mitigate CSRF attacks by using a unique and non-guessable value associated with each authentication request about to be initiated.
    const state: number = Math.floor(Math.random() * 1e9); // 1e+9 = 1 billion
    const encodeLink: string = encodeURIComponent(
      this.client.config.callbackUrl
    );
    const encodeScope: string = encodeURIComponent(this.client.config.scope);
    return `${GITHUB_BASE_URL}/authorize?response_type=code&client_id=${this.client.config.clientId}&redirect_uri=${encodeLink}&state=${state}&scope=${encodeScope}`;
  };

  async processAuth(stringPathName: { search: string }) {
    /** Parses the authorization response request tokens from the authorization server. */
    const code: string = JSON.stringify(stringPathName.search);
    const parsedCode: string = code.slice(
      code.indexOf('"?code=') + 7,
      code.indexOf("&state")
    );

    let result: unknown;

    /** Exchange the authorization code for an access token */
    await fetch(`${GITHUB_BASE_URL}/access_token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: this.client.config.clientId, //provided by GitHub
        client_secret: this.client.config.clientSecret, //provided by GitHub
        code: parsedCode,
        redirect_uri: this.client.config.callbackUrl, //provided by GitHub
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then(async (paramsString) => {
        const params = new URLSearchParams(paramsString);
        const tokenKey: unknown[] = [];
        for (const [key, value] of params.entries()) {
          tokenKey.push(key, value);
        }
        const obj: any = tokenKey[0];
        const values: unknown[] = Object.values(obj);
        const tokenArr = [];
        let i = 17;
        while (values[i] !== '"') {
          tokenArr.push(values[i]);
          i++;
        }
        const bearerToken: string = tokenArr.join("");

        /** Use the access token to make an authenticated API request */
        await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
          .then((response) =>
            response
              .json()
              .then((u) => (result = u))
              .catch(console.error)
          )
          .catch(console.error);
      });

    return result;
  }

  async handleUserResponse(userResponse: GitHubUser): Promise<void> {
    console.log("gh userResponse", userResponse);
  }
}

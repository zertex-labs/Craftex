import { GitHubClient } from "./github.client.ts";

// 'https://github.com/login/oauth/authorize?response_type=code&client_id=${your_clientId}&redirect_uri=${your_encoded_redirect_Link}&state=${foobar}&scope=${your_encoded_scope}'

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
}

import { DiscordClient } from "./discord.client.ts";

// 'https://discord.com/api/oauth2/authorize?response_type=code&client_id={your_clientId}&scope={your_encoded_scope}&state={state}&redirect_uri={your_redirect_uri}'

export const DISCORD_BASE_URL = "https://discord.com/api";

export abstract class DiscordGrant {
  constructor(protected readonly client: DiscordClient) {}
}

export class DiscordStrategy extends DiscordGrant {
  constructor(client: DiscordClient) {
    super(client);
  }

  /** Builds a URI you can redirect a user to to make the authorization request. */
  createLink() {
    // The primary reason for using the state parameter is to mitigate CSRF attacks by using a unique and non-guessable value associated with each authentication request about to be initiated.
    const state: number = Math.floor(Math.random() * 1e9); // 1e+9 = 1 billion

    const encodeLink = encodeURIComponent(this.client.config.callbackUrl);
    const encodeScope = encodeURIComponent(this.client.config.scope);
    return `${DISCORD_BASE_URL}/oauth2/authorize?response_type=code&client_id=${this.client.config.clientId}&scope=${encodeScope}&state=${state}&redirect_uri=${encodeLink}`;
  }

  async processAuth({ search }: { search: string }) {
    /** Parses the authorization response request tokens from the authorization server. */
    const code: string = JSON.stringify(search);
    const parsedCode: string = code.slice(
      code.indexOf('"?code=') + 7,
      code.indexOf("&state")
    );
    const userResponse: unknown[] = [];

    /** Exchange the authorization code for an access token */
    await fetch(`${DISCORD_BASE_URL}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: parsedCode,
        redirect_uri: this.client.config.callbackUrl,
        client_id: this.client.config.clientId,
        client_secret: this.client.config.clientSecret,
      }),
    })
      .then((response) => response.text())
      .then(async (paramsString) => {
        const params = new URLSearchParams(paramsString);
        const tokenKey = [];

        for (const [key, value] of params.entries()) {
          tokenKey.push(key, value);
        }
        const obj = tokenKey[0];
        const values: unknown[] = Object.values(obj);

        const tokenArr: unknown[] = [];
        let i = 18;
        while (values[i] !== '"') {
          tokenArr.push(values[i]);
          i++;
        }
        const bearerToken = tokenArr.join("");

        /** Use the access token to make an authenticated API request */
        await fetch(`${DISCORD_BASE_URL}/users/@me`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
          .then((response) => response.json().then((u) => userResponse.push(u)))
          .catch(console.error);
      });
    return userResponse[0];
  }
}

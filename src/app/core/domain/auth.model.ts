export class AuthToken {
  access_token: string;
  token_type: string
  expires_in: number;
  should_expire_at: string;

  constructor(data: AuthToken) {
    this.access_token = data.access_token;
    this.token_type = data.token_type;
    this.expires_in = data.expires_in;
    this.should_expire_at = new Date(new Date().getTime() + data.expires_in * 1000).toISOString();
  }

  static fromJson(json: string | null): AuthToken | null {
    if (!json) return null;
    return new AuthToken(JSON.parse(json));
  }

  isExpired(): boolean {
    return new Date().getTime() >= new Date(this.should_expire_at).getTime();
  }
}
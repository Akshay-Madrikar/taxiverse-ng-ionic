export class User {
  constructor(
    public _id: string,
    public email: string,
    public role: number,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}

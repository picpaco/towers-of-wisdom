export class User {
    private _username: string;
   
    private _email: String;
    public get email(): String {
        return this._email;
    }
    public set email(value: String) {
        this._email = value;
    }
    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    private _token: String;
    public get token(): String {
        return this._token;
    }
    public set token(value: String) {
        this._token = value;
    }
    private _role: String;
    public get role(): String {
        return this._role;
    }
    public set role(value: String) {
        this._role = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
 
}

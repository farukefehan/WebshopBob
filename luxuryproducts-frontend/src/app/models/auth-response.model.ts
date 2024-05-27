import { RoleType } from "./enume/RoleType";

export class AuthResponse {
    public email: string;
    public token: string;
    public roleType:RoleType;
}

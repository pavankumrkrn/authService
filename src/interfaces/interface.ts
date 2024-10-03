import { Document } from "mongoose";

export interface User extends Document {
    password: string;
    username: string;
    email: string;
}

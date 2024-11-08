import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
    // ip: string;
    body: T;
}

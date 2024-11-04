export interface TypedRequestBody<T> extends Express.Request {
    ip: string;
    body: T;
}

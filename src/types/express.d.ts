namespace Express {
  export interface Request extends Express.Request {
    user?: JWT_PAYLOAD
  }
}
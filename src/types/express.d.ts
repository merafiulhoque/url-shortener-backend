namespace Express {
  export interface Request extends Express.Request {
    user?: {
      id: number;
      email: string;
    };
  }
}
declare namespace Express {
  export interface Response {
    success: <T = unknown>({
      data,
      status,
      message,
    }: {
      data?: T;
      status?: number;
      message?: string | null;
    }) => Response;
    error: ({
      data,
      status,
      message,
    }: {
      data?: unknown;
      status?: number;
      message?: string | null | Record<string, string[]>;
    }) => Response;
  }
}

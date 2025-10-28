export type responseMessage = {
  statusCode: number;
  detail: {
    userEmail?: string;
    status: boolean;
    message?: string;
  };
};

export type responseMessage = {
  status: boolean;
  userEmail?: string;
  detail: {
    message?: string;
    statusCode: number;
  };
};

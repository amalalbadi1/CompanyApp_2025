export type User = {
  id: string;
  dispName: string;
  email: string;
  token: string;
  imageUrl?: string;
};

export type LoginCreds = {
  email: string;
  password: string;
};
export type RegisterCreds = {
  dispName: string;
  email: string;
  password: string;
};
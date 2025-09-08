export type UserJWTType = {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSessionType = {
  user: UserJWTType;
  expires: Date;
  iat: number;
  exp: number;
};

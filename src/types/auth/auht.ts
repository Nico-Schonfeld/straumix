export type UserDataRegisterType = {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  country: string;
  preferredCurrency: string;
};

export type UserDataLoginType = {
  email: string;
  password: string;
};

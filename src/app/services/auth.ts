import { TLoginUser } from "../interfaces/auth";

const loginUser = async (playload: TLoginUser) => {
  console.log(playload);

  return {};
};

export const AuthServices = {
  loginUser,
};

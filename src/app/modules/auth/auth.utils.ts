import jwt from "jsonwebtoken";
7;

export const createToken = (
  jwtPayload: { userIdL: string; role: string },
  secret: string,
  expiresIn: string
) => {
  jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

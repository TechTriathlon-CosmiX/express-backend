import jwt from 'jsonwebtoken';

export async function generateToken(tokenData: any, secretKey: string, jwt_expire: string): Promise<string> {
  return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
}

export async function decodeToken(token: string, secretKey: string): Promise<any> {
  return jwt.verify(token, secretKey);
}


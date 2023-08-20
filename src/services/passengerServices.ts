import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';




export async function generateToken(tokenData: any, secretKey: string, jwt_expire: string): Promise<string> {
    return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
}

export async function decodeToken(token: string, secretKey: string): Promise<any> {
    return jwt.verify(token, secretKey);
}

export async function checkPassword(hashedPassword:string,password: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
      } catch (error) {
        return false;
        console.log(error);
      }
}

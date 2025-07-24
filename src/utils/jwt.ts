import  jwt  from "jsonwebtoken";

const JWT_SECRET=process.env.JWT_ACESSTOKEN
const JWT_REFRESH_SECRET=process.env.JWT_REFRESHTOKEN


export const generateAccessToken=(payload:object):string=>{
    return jwt.sign(payload,JWT_SECRET,{expiresIn:'15m'})
}

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blackList.model.js";


async function authUser (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Token is not provided",
      });
    }
    const isTokenBlackList=await tokenBlackListModel.findOne({token })
    if(isTokenBlackList){
      return res.status(401).json({
        message:"token is invalid"
      })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Inavlid token",error,
    });
  }
}
export default authUser

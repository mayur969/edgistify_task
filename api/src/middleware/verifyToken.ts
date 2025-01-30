import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import env from "../../env";
import { User } from "../schema/user";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }


    jwt.verify(token, env.JWT_SECRET_KEY, async(err: VerifyErrors | null,
        payload: JwtPayload | string | undefined) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        if(payload && typeof payload === "object") {

        const email = payload.userData.email;
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(403).json({ message: "Invalid token: User not found" });
        }
        req.body.user = user;
        next();
        }
    })
}

export default verifyToken;
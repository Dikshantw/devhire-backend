import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

interface TokenPayload extends JwtPayload {
    id: string;
    role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({message: "No Token provided"})
    }
    const token = header.replace("Bearer ","");

    try {
        const decoded = jwt.verify(token, jwtSecret) as TokenPayload;

        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"})
    }
}
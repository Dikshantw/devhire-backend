import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";

const JWTSECRET = process.env.JWT_SECRET!;
export const signup = async (req:Request, res: Response) => {
    const {email,password} = req.body;

    const existing = await prisma.user.findUnique({
        where: {email}
    })

    if(existing) throw new Error("Email already registered")
    
    const hashed = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {email,password}
    })
    
    res.status(200).json({id: user.id, email: user.email})
}

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({where: {email}});
    if(!user) throw new Error("Invalid Credentials");

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new Error("Invalid Credentials");

    const token = jwt.sign({id: user.id}, JWTSECRET, {expiresIn: '1d'})

    res.json(token)
}
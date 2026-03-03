import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { Role } from "../generated/prisma/enums.js";

export const createCompany = async (req: Request, res: Response) => {
    const user = req.user;
    const {name, description} = req.body;
    if(user?.role !== Role.RECRUITER){
        throw new Error("Only Recruiter can create a company")
    }
    const existingUser = await prisma.user.findUnique({
        where: {id: user.id}
    })
    if(existingUser?.companyId){
        throw new Error("Recruiter already belongs to company")
    }
    const company = await prisma.company.create({
        data: {name,description}
    })
    await prisma.user.update({
        where: {id: user.id},
        data: {companyId: company.id}
    })

    res.status(201).json(company)
}
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const apply = async (req: Request, res:Response) => {
    const user = req.user;
    const {jobId} = req.params;
    if(user?.role !== "SEEKER"){
        throw new Error("Only Job Seeker can apply")
    }
    const existing = await prisma.application.findUnique({
        where: {
            userId_jobId: {
                userId: user.id,
                jobId: jobId as string
            }
        }
    })
    if(existing){
        throw new Error("Already applied for this job")
    }
    const application = await prisma.application.create({
        data: {
            userId: user.id,
            jobId: jobId as string
        }
    })
    res.status(201).json(application)
}
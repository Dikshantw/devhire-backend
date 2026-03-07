import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

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

export const getApplications = async (req:Request, res: Response) => {
    const user = req.user;
    const {jobId} = req.params;

    const job = await prisma.job.findUnique({
        where: {
            id: jobId as string
        }
    })

    if(!job){
        throw new Error("Job not found")
    }

    const recruiter = await prisma.user.findUnique({
        where: {
            id: user?.id
        }
    })
    if(job.companyId !== recruiter?.companyId){
        throw new Error("Not authorized to view applicants for this job")
    }

    const applicants = await prisma.application.findMany({
        where: {jobId: jobId as string},
        include: {
            user: true
        }
    })

    res.status(200).json(applicants)
}

export const updateStatus = async(req: Request, res:Response) => {
    const {applicationId} = req.params;
    const {status} = req.body;

    const updated = await prisma.application.update({
        where: {id: applicationId as string},
        data: { status }
    })
    res.status(200).json(updated)
}
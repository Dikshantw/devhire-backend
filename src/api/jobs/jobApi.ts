import { prisma } from "../../lib/prisma.js"
import { Request, Response } from "express"

export const getJobs = async (req: Request, res: Response) => {
    const query = req.query;
    let filters: any = {}
    if(query.location){
        filters.location = {contains: query.location, mode: "insensitive"}
    }
    const jobs = await prisma.job.findMany({
        where: filters,
        include: {company: true}
    });

    res.status(201).json(jobs)
}

export const createJob = async(req: Request, res: Response) => {
    const user = req.user;
    const jobData = req.body;
    if(user?.role !== "RECRUITER"){
        throw new Error("Only recruiters can post jobs")
    }
    // also recruiter must belong to the company
    const recruiter = await prisma.user.findUnique({
        where: {id: user.id}
    })
    if(!recruiter?.companyId){
        throw new Error("Recruiter must belong to the company")
    }
    const job = await prisma.job.create({
        data: {...jobData, companyId: recruiter.companyId}
    })
    res.status(200).json(job)
}
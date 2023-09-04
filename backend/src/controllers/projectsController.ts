import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { ApiError } from "../helpers/api-errors";
import { createToken, verifyToken } from "../helpers/jwt";
import { error } from "console";
import { ExtendedRequest } from "../middlewares/authJWT";

const IsTeacher = (user?: { role: string }) => {
    if (!user || user.role !== 'TEACHER') {
        throw new ApiError("Somente professores podem criar projetos", 401);
    }
}

const createProjects = (req:ExtendedRequest, res:Response) =>{
    
}




export {
    createProjects,
}
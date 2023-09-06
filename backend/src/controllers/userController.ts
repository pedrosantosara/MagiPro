import { Request, Response } from "express";
import { ExtendedRequest } from "../middlewares/authJWT";
import { prisma } from "../database/prisma";

//TODO rota para pegar todos alunos inscritos no projeto 
//TODO rota para depois de ver todos alunos inscritos ver perfil aluno 

const getPerfil = async (req:ExtendedRequest, res:Response) => { // rota para pegar nome email curriculo e descrição
    const userId = req.params.userId
    const userPerfil = await prisma.user.findUnique({
        where:{
            id: userId
        },
        select: {
            name:true,
            email:true,
            resume:true,
            description:true
        }
    }); 
    res.status(200).json(userPerfil)
}

const getAllProjects = async (req:ExtendedRequest,res:Response) =>{
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
}

const getProject = async (req:ExtendedRequest,res:Response) =>{
    const projectid = req.params.projectId; 
    const project = await prisma.project.findUnique({
        where:{
            id: projectid
        }
    });
    res.status(200).json(project);
}


export 
{
    getPerfil,
    getAllProjects,
    getProject
}
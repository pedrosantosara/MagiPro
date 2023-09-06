import { Request, Response } from "express";
import { ExtendedRequest } from "../middlewares/authJWT";
import { prisma } from "../database/prisma";
import bcrypt from 'bcrypt';


//TODO rota para pegar todos alunos inscritos no projeto 
//TODO rota para depois de ver todos alunos inscritos ver perfil aluno 

const getPerfil = async (req:ExtendedRequest, res:Response) => { 
    // rota para pegar nome email curriculo e descrição
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

const updatePerfil = async (req:ExtendedRequest, res:Response) =>{
    const idFromJwt = req.user?.userId;
    const idUserParams = req.params.userId;

    console.log(idFromJwt,idUserParams)
  if (idFromJwt !== idUserParams) {
    return res.status(403).json({ message: "Não foi possivel atualizar o perfil" });
  }

  const { name, email, resume, description, oldPassword, newPassword } = req.body;
  
  const user = await prisma.user.findUnique({ where: { id: idFromJwt } });

  if (!user || !await bcrypt.compare(oldPassword, user.password)) {
    return res.status(400).json({ message: "Não foi possivel atualizar o perfil" });
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { id: idFromJwt },
    data: { name, email, resume, description, password: newHashedPassword },
  });

  return res.status(200).json(updatedUser);
};




export 
{
    updatePerfil,
    getPerfil,
    getAllProjects,
    getProject
}
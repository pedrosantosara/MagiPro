import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcrypt";
import { ApiError } from "../helpers/api-errors";
import { isValid } from "../helpers/validator";

const createUser = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword, role } = req.body;
    
    const errors = await isValid({name,email,password,confirmPassword});
    if (errors.length > 0) return res.status(401).json({ errors });

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    const roleToUpperCase = role.toUpperCase();

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassowrd, role: roleToUpperCase },
    });
    return res.json({message:"Usuario Criado Com Sucesso"});
};

const createTeste  = async (req: Request, res: Response) => {
    
}

export {
    createUser,
    createTeste
}
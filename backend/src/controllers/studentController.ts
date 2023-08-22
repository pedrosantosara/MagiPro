import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcrypt";



const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    const roleToUpperCase = role.toUpperCase();

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassowrd, role: roleToUpperCase },
    });

    return res.json(user);
};


export {
    createUser,
}
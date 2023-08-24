import validator from 'validator';
import { prisma } from "../database/prisma";

interface Iuser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
}

export async function isValid(body:Iuser) : Promise<string[]>{
    const errors = [];
    
    const { name, email, password, confirmPassword } = body;

    //#region  Validação de nome
    if (!name) {
      errors.push("Nome ausente.");
    } else {
      if (name.length < 3 || name.length > 12) {
        errors.push("O nome deve ter entre 3 e 12 caracteres.");
      }
    }
    //#endregion
  
    //#region  Validação de senha
    if (!password || !confirmPassword) {
      errors.push("Campo senha ausente.");
    } else {
      // Validar senha entre 6 e 12 caracteres)
      if (password.length < 6 || password.length > 12) {
        errors.push("A senha deve ter entre 6 e 12 caracteres.");
      }
  
      // Validar confirmação de senha
      if (password !== confirmPassword) {
        errors.push("A senha e a confirmação de senha não coincidem.");
      }
    }
    //#endregion
  
    //#region  Validação de e-mail
    if (!email) {
      errors.push("Campo e-mail ausente.");
      return errors;
    }
    const isValidEmail = validator.isEmail(email);
  
    if (!isValidEmail) {
      errors.push("E-mail inválido.");
      return errors;
    }
  
    if (errors.length > 0) return errors;
    const userExists = await prisma.user.findFirst({where:{email}})
  
    if (userExists) {
      errors.push("Já existe um usuário com esse e-mail.");
    }
    //#endregion
  
    return errors;
  }

  
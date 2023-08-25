import jwt from 'jsonwebtoken';
import { ApiError } from './api-errors';

const jwtPassword = process.env.PASSWORD_JWT as string;

if(!jwtPassword) throw new ApiError('Error interno do servidor',500);

interface Payload {
    userId: string;
    role: string;
}

function createToken(payload: Payload): string {
    return jwt.sign(payload, jwtPassword, { expiresIn: '1h' });
}

const verifyToken = (token: string): Payload | null =>{
    const decoded = jwt.verify(token, jwtPassword) as Payload;
        return decoded;
    if(!decoded) throw new ApiError('Token invalido', 500)
}
 
export {
    createToken,
    verifyToken,
    jwtPassword
}
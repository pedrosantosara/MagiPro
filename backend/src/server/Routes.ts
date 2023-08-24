import { Router } from "express";
import { createTeste, createUser } from "../controllers/userController";

const router = Router();

router.post("/register", createUser);
router.get("/",createTeste)

export { router };
import { Router } from "express";
import { createUser } from "../controllers/studentController";

const router = Router();

router.post("/register", createUser);


export { router };
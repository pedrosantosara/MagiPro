import { Router,Request,Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { createProjects } from "../controllers/projectsController";
import { isUserLoggedIn } from "../middlewares/authJWT";
import { getAllProjects, getPerfil, getProject, updatePerfil } from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/projects", getAllProjects)
router.get("/projects/:projectId", getProject)
router.get("/perfil/:userId",getPerfil);

//rotas necessarias ter autenticação
router.use(isUserLoggedIn) // middleware login 

router.put("/perfil/:userId", updatePerfil)
router.post("/projects",createProjects);


export { router };
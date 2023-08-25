import 'express-async-errors';
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/error';
import { router } from './server/Routes';
import Express from 'express';
import dotenv from 'dotenv';


const app = Express();
dotenv.config();
const PORT = 8070;
app.use(Express.json())
app.use(helmet()); 
app.use(router);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`)
});


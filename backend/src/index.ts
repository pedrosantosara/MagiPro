import { router } from './server/Routes';
import Express from 'express';


const app = Express();
const PORT = 8070;
app.use(Express.json())
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`)
});


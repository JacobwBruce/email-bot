import express from 'express';
import { sendEmail } from './EmailSender';

const app: express.Application = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/sendEmail', async (req: express.Request, res: express.Response) => {
    const { name, email, message } = req.body;
    const response: any = await sendEmail(email, name, message);
    res.json(response);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running 🚀
    Port: ${PORT}`);
});

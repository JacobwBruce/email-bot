import express from 'express';
import { sendEmail, sendPortfolioEmail } from './EmailSender';

const app: express.Application = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/sendPortfolioEmail', async (req: express.Request, res: express.Response) => {
    const { name, email, message } = req.body;
    const response: any = await sendPortfolioEmail(email, name, message);
    res.json(response);
});

app.post('/sendEmail', async (req: express.Request, res: express.Response) => {
    const { email, heading, message } = req.body;

    if (!email || !heading || !message) {
        res.status(400).json({ message: 'Must provide an email, heading, and message in request' });
    } else {
        const response = await sendEmail(email, heading, message);
        res.json(response);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running 🚀
    Port: ${PORT}`);
});

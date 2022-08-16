import  express  from "express";
import messages from './routes/messages.mjs';
import dbFile from "./dbFile.mjs";
import cors from 'cors';

const app = express();
const PORT = 8060;


dbFile.init();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/message', messages)
app.listen(PORT,()=> {
    console.log(`Server startdet at http://localhost:${PORT} port`);
})
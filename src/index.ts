import express from 'express'
import helmet from 'helmet'
// import xss from 'xss-clean'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import v1Router from './urls'
import auth from './middlewares/auth'

dotenv.config()


const app = express();
const PORT = process.env.PORT || "3000";

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use(auth)

app.use('/v1', v1Router)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

module.exports = app;

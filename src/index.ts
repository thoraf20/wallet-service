import express, { NextFunction, Request, Response } from 'express'
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

const unless = (path: string[], middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (path.includes(req.path)) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use(unless(['/v1/register', '/v1/login'], auth))

app.use('/v1', v1Router)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

export default app;

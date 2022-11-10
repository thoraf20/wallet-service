import { Request, Response, NextFunction} from 'express'
import httpStatus from "http-status-codes";
import jwt from 'jsonwebtoken'
import jwtConfig from "../config/jwt";

const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
          return res.status(httpStatus.UNAUTHORIZED).send({
            success: false,
            message: "This resources requires authorization",
          });
        }
        const decodeToken = jwt.verify(token.split(' ')[1], jwtConfig.appKey)
        req.user = decodeToken
        res.locals.user = { 
          id: req.user.id, 
          email: req.user.email, 
          first_name: req.user.first_name,
          last_name: req.user.last_name,
        },
        next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
};

export default auth

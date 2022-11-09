import { RequestHandler } from 'express'
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi'
import UserService from "../../services/users/users.service";
import jwtConfig from '../../config/jwt';


export const registerHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {

    const userExist = await UserService.findUserByEmail(value.email);

    if (userExist) {
      return res.status(httpStatus.CONFLICT).json({
        message: 'Account Already Registered'
      })
    }

    await UserService.createUser(value);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Registered successfully!",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
export const loiginHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const userExist = await UserService.findUserByEmail(value.email);
    if (!userExist) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Credentials", success: false });
    }
    const match = await bcrypt.compare(value.password, userExist.password);
    if (!match) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "Invalid email or password", success: false });
    }

    const payload = {
      id: userExist.id,
      first_name: userExist.first_name,
      last_name: userExist.last_name,
      email: userExist.email,
    };

    const token = jwt.sign(payload, jwtConfig.appKey, {
      expiresIn: "1h",
    });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Logged in successfully!",
      results: payload,
      token,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

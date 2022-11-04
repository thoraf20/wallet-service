import dotenv from 'dotenv'
dotenv.config()

const jwtConfig = {
  appKey: process.env.APP_SECRET_KEY || 'secret',
};

export default jwtConfig
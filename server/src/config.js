import dotenv from 'dotenv'
dotenv.config()

const config = {
    development: {
        mongoUrl: process.env.MONGO_URL,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET
    }
}

export default config[process.env.NODE_ENV || 'development']
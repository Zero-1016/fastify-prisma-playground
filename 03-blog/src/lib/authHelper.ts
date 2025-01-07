import bcrypt from 'bcrypt';
import db from './db';
import { ACCESS_TOKEN_EXPIRES, ERROR_MESSAGE, REFRESH_TOKEN_EXPIRES, ROUND, SECRET_KEY } from './constants';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleError } from './errorHelper';

const generateHash = (pwd: string) => {
    const hashPwd = bcrypt.hashSync(pwd, ROUND)
    return hashPwd;
}

const duplicateVerifyUser = async (email: string) => {
    try {
        const userCount = await db.user.count({
            where: {
                email,
            },
        })

        if(userCount > 0) throw ERROR_MESSAGE.alreadySignup

        return true
    }
    catch(error) {
        throw error
    }
}

const verifyPassword = async (email: string,pwd: string) => {
    try {
        const encryptedPwd = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                password: true,
            },
        })

        if(!encryptedPwd) return false
        
        const result = bcrypt.compareSync(pwd, encryptedPwd.password)
        return result
    } catch(error) {
        throw error
    }
}

const generateAccessToken = (user: { id: number, email: string}) => {
    const accessToken = jwt.sign({id: user.id, email: user.email}, SECRET_KEY, {expiresIn: ACCESS_TOKEN_EXPIRES})
    return accessToken
}

const generateRefreshToken = (user: { id: number, email: string}) => {
    const refreshToken = jwt.sign({id: user.id, email: user.email}, SECRET_KEY, {expiresIn: REFRESH_TOKEN_EXPIRES})
    return refreshToken
}

const verifyRefreshToken = async (refreshToken: string) => {
    try {
        const decoded = jwt.verify(refreshToken, SECRET_KEY) as JwtPayload
        const tokenFromServer = await db.token.count({
            where: {
                userId: decoded.id,
                refreshToken: refreshToken,
            },
        })

    if(tokenFromServer > 0) {
        return decoded
        }else {
            throw ERROR_MESSAGE.unauthorized
        }
    } catch(error) {
        throw ERROR_MESSAGE.unauthorized
    }
}

const shortVerifyRefreshToken = async (refresh_token: string) => {
    try {
        const decoded = jwt.verify(refresh_token, SECRET_KEY) as JwtPayload
        if(decoded) {
            return true
        }else {
            return false
        }
    } catch(error) {
        throw ERROR_MESSAGE.unauthorized
    }
}

const verifyAccessToken = async (access_token: string) => {
    try {
        const decoded = jwt.verify(access_token, SECRET_KEY) as JwtPayload
        return decoded
    } catch(error) {
        throw ERROR_MESSAGE.invalidToken
    }
}

const verifySignIn = async (req: FastifyRequest, rep: FastifyReply) => {
    const userId = req.user?.id
    const email = req.user?.email

    if(userId && email) {
        return 
    }else {
        handleError(rep, ERROR_MESSAGE.unauthorized)
    }
}
export {
    generateHash,
    duplicateVerifyUser,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    shortVerifyRefreshToken,
    verifyAccessToken,
    verifySignIn
}
import bcrypt from 'bcrypt';
import db from './db';
import { ACCESS_TOKEN_EXPIRES, ERROR_MESSAGE, REFRESH_TOKEN_EXPIRES, ROUND, SECRET_KEY } from './constants';
import jwt from 'jsonwebtoken'

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

export {
    generateHash,
    duplicateVerifyUser,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
}
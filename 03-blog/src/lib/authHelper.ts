import bcrypt from 'bcrypt';
import db from './db';
import { ERROR_MESSAGE, ROUND } from './constants';

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

export {
    generateHash,
    duplicateVerifyUser,
}
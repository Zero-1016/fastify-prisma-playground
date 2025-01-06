import db from "../lib/db"
import { generateHash } from "../lib/authHelper"
import { FIRST_PWD } from "../lib/constants"

const checkStartupUser = async () => {

    const pwd = FIRST_PWD as string
    console.log(pwd)
    const hashPwd = generateHash(pwd)
    const userCount = await db.user.count({})

    if(userCount === 0) {
        let count = 1
        let maxCount = 1

        while(count <= maxCount) {
            const value = {
                email: `user${count}@gmail.com`,
                password: hashPwd,
            }

            await db.user.create({
                data: value
            })

            count++
        }

        console.log('created startup user')
    }
}

const checkStartupArticle = async () => {
    const articleCount = await db.article.count({})

    if(articleCount === 0) {
        const user = await db.user.findFirst({
            orderBy: {
                id: 'asc'
            }
        })

        if(user) {
            let count = 1
            const maxCount = 50

            while(count <= maxCount) {
                const value = {
                    content: `content_${count}`,
                    userId: user.id
                }

                await db.article.create({
                    data: value
                })

                count++
            }

            console.log('created startup article')
        }else {
            await checkStartupUser()
            await checkStartupArticle()
        }
    }
}

export {
    checkStartupUser,
    checkStartupArticle
}
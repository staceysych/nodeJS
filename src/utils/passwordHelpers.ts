const bcrypt = require('bcrypt')

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 12)
}

export const comparePasswords = async (password: string, user: any) => {
    return bcrypt.compare(password, user?.password)
}
const bcrypt = require('bcrypt')

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 12)
}

export const comparePasswords = async (password: string, user: any) => {
    const passwordToCompare = Array.isArray(user) ? user[0].password : user.password;
    return bcrypt.compare(password, passwordToCompare)
}
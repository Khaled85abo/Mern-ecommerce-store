import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Khaled',
        email: 'khaled@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ibrahim',
        email: 'ibrahim@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]


export default users
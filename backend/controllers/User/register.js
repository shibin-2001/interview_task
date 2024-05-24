const bcrypt = require ("bcrypt");

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// REGISTER USER

 const register = async (req, res) => {
    try {
        const {

            email,
            password,

        } = req.body;

        const Salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, Salt);
//         let check = await prisma.user.findUnique({
//             where:{
//                 email:email
//             }
//         })
//    if(check) res.status(401).json(newUser);
        const newUser = await prisma.user.create({
          data:{
            email:email,
            password:hashedPassword
          }
        })
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {register}
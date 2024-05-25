const bcrypt =  require("bcrypt");
const jwt =  require("jsonwebtoken");

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// LOGGING IN
 const login = async (req, res) => {
  try {
    const { email, password } = req.body;
const found =await prisma.user.findMany({
    where:{
        email:email
    }
})

user = found[0]
console.log(user)
if(!user) return res.status(400).json({message:"user does not exists"})


const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch) return res.status(400).json({message:"Invalid Credentials"})

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

delete user.password

res.status(200).json({token,user})

  } catch (err) {
    res.status(500).json({error:err.message})
  }
};


module.exports = {login}
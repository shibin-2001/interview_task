const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getCourse = async(req,res)=>{


    try{
let courses =  await prisma.course.findMany()
console.log(courses)
res.status(200).json(courses)
    }catch(err){
        console.log(err)
        res.status(500).json({data:err.message})
    }
}

module.exports = {getCourse}
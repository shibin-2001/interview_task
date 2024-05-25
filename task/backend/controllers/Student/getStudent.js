const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getStudent = async(req,res)=>{
    try{
        let students =  await prisma.student.findMany({
            include: {
                course: true,
              },
        })
        res.status(200).json(students)
            }catch(err){
                console.log(err)
                res.status(500).json({data:err.message})
            }
}

module.exports = {getStudent}
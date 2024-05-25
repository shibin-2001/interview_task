const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const deleteStudent = async(req,res)=>{
    try{

        const {id} = req.params
        console.log(data,id)
        const deleteStudent = await prisma.student.delete({
            where: {
              id: id,
            },
          })
          const allStudents = await prisma.student.findMany({
            include: {
                course: true,
              },
        })
          console.log(allStudents)
          res.status(201).json(allStudents);
    }catch(err){
        res.status(500).json({data:err.message});
    }
}

module.exports = {deleteStudent}
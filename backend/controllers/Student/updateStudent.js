const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const updateStudent = async(req,res)=>{
    try{

        const data = req.body
        const {id} = req.params
        console.log(data,id)
        const updatedStudent = await prisma.student.update({
            where: {
              id: id,
            },
            data: 
             data
            
          })
          let students =  await prisma.student.findMany()
          console.log(students)
          res.status(201).json(updatedStudent);
    }catch(err){
        res.status(500).json({data:err.message});
    }
}

module.exports = {updateStudent}
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const toggleActiveStudent = async(req,res)=>{
    try{

    
        const {id} = req.params
      let found =   await prisma.student.findUnique({
        where: {
          id: id,
        },
      
        
      })
      if(found){
       let isActive = found.isActive
        const updatedStudent = await prisma.student.update({
            where: {
              id: id,
            },
            data: {
                isActive:!isActive
            }
             
            
          })
          let students =  await prisma.student.findMany({
            include: {
                course: true,
              },
        })
          console.log(students)
          res.status(201).json(students);
      }
       
    }catch(err){
        res.status(500).json({data:err.message});
    }
}

module.exports = {toggleActiveStudent}
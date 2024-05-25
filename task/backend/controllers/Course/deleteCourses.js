const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const deleteCourse = async(req,res)=>{
    try{

        const {id} = req.params
        console.log(id)
        const deleteCourse = await prisma.course.delete({
            where: {
              id: id,
            },
          })
          const allCourses = await prisma.course.findMany()
          console.log(allCourses)
          res.status(201).json(allCourses);
    }catch(err){
        res.status(500).json({data:err.message});
    }
}

module.exports = {deleteCourse}
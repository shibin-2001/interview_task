const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const updateCourse = async(req,res)=>{
try{

    const data = req.body
    const {id} = req.params
    console.log(data,id)
    const updatedCourse = await prisma.course.update({
        where: {
          id: id,
        },
        data: 
         data
        
      })
      console.log(updatedCourse)
      const allCourses = await prisma.course.findMany()
      res.status(201).json(allCourses);
}catch(err){
    res.status(500).json({data:err.message});
}
}

module.exports = {updateCourse}
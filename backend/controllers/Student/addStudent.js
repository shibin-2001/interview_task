const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addStudent = async(req,res)=>{
    try {
    
        let data = req.body
        console.log(data)
     
        let check = await prisma.student.findUnique({
            where: {
                email: data.email
            }
        })
        if (check) { res.status(200).json({ data: 'Student already exists' }) }
        else {
            let student = await prisma.student.create({
                data:data
            })
            res.status(201).json(student);
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

module.exports = {addStudent}
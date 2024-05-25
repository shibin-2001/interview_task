
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addCourse = async (req, res) => {
    try {
        // const {
        //     name, fees, description
        // } = req.body
        let data = req.body
        console.log(data)
        // console.log(name, fees, description)
        let check = await prisma.course.findUnique({
            where: {
                name: data.name
            }
        })
        if (check) { res.status(200).json({ data: 'Coursse already exists' }) }
        else {
            let course = await prisma.course.create({
                data:data
            })
            res.status(201).json(course);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addCourse }
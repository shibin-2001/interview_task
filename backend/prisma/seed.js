const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  const user = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: '$2b$10$/r3aLIimwoBVrGBwdGuYYeNgDhr.AGJn6pHtw6IvuRkluS6Efv/Oe',
    },
  });

  const course1 = await prisma.course.create({
    data: {
      name: 'Course 1',
      fees: 100,
      description: 'Description for Course 1',
    },
  });

  const student1 = await prisma.student.create({
    data: {
      email: "student1@example.com",
      phone: "1234567890",
      name: "Student 1",
      address: {
       
          street: "123 Main St",
          city: "City",
          state: "State",
          zip: "12345"
        
      },
      courseId: "6650c3f39ccc1b05c5dd1023"
    }
  });
  

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

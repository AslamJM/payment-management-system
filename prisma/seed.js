import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: "super" },
    update: {},
    create: {
      name: "Super Admin",
      username: "super",
      role: "ADMIN",
      password: "123456",
    },
  });

  console.log("seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

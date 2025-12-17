import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/prisma/client";
dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const defaultCategoryName = "All products";
  const defaultCategory = await prisma.category.upsert({
    where: { name: defaultCategoryName },
    update: {},
    create: {
      name: defaultCategoryName,
      description: "All products",
    },
  });

  console.log(`✅ Category created by seed: ID ${defaultCategory.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

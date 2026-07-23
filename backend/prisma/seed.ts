import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics', slug: 'electronics' }
  });

  const clothing = await prisma.category.create({
    data: { name: 'Clothing', slug: 'clothing' }
  });

  const books = await prisma.category.create({
    data: { name: 'Books', slug: 'books' }
  });

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: Role.ADMIN
    }
  });

  // Create customer user
  const customerPassword = await bcrypt.hash('customer123', 10);
  await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Customer User',
      password: customerPassword,
      role: Role.CUSTOMER
    }
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        stock: 50,
        imageUrl: '/uploads/headphones.jpg',
        categoryId: electronics.id
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: 199.99,
        stock: 30,
        imageUrl: '/uploads/smartwatch.jpg',
        categoryId: electronics.id
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 24.99,
        stock: 100,
        imageUrl: '/uploads/tshirt.jpg',
        categoryId: clothing.id
      },
      {
        name: 'Denim Jeans',
        description: 'Classic fit denim jeans',
        price: 59.99,
        stock: 75,
        imageUrl: '/uploads/jeans.jpg',
        categoryId: clothing.id
      },
      {
        name: 'JavaScript Guide',
        description: 'Complete guide to modern JavaScript',
        price: 39.99,
        stock: 40,
        imageUrl: '/uploads/jsbook.jpg',
        categoryId: books.id
      },
      {
        name: 'React Patterns',
        description: 'Advanced React design patterns',
        price: 44.99,
        stock: 25,
        imageUrl: '/uploads/reactbook.jpg',
        categoryId: books.id
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
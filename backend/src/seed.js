const bcrypt = require('bcryptjs');

const { UserModel } = require('./features/auth/auth.models');
const { ProductModel } = require('./features/products/products.models');
const { logger } = require('./utils/logger.utils');

const imageBase = 'https://images.unsplash.com';
const imageOptions = 'auto=format&fit=crop&w=900&q=80';

function images(...ids) {
  return ids.map((id) => `${imageBase}/${id}?${imageOptions}`);
}

const products = [
  {
    name: 'Everyday Canvas Tote',
    description: 'Durable cotton tote with reinforced straps for errands and work gear.',
    category: 'Bags',
    price: 28500,
    imageUrls: images(
      'photo-1590874103328-eac38a683ce7',
      'photo-1542291026-7eec264c27ff',
      'photo-1523779105320-d1cd346ff52b'
    ),
    stock: 34
  },
  {
    name: 'Ceramic Pour-Over Set',
    description: 'Minimal ceramic dripper and server for consistent home coffee.',
    category: 'Kitchen',
    price: 68500,
    imageUrls: images(
      'photo-1442512595331-e89e73853f31',
      'photo-1514432324607-a09d9b4aefdd',
      'photo-1495474472287-4d71bcdd2085'
    ),
    stock: 12
  },
  {
    name: 'Desk Organizer Tray',
    description: 'Powder-coated steel tray for notebooks, pens, and daily carry.',
    category: 'Office',
    price: 36500,
    imageUrls: images(
      'photo-1497366754035-f200968a6e72',
      'photo-1516321318423-f06f85e504b3',
      'photo-1483058712412-4245e9b90334'
    ),
    stock: 20
  },
  {
    name: 'Linen Throw Blanket',
    description: 'Soft woven throw sized for sofas, reading chairs, and travel.',
    category: 'Home',
    price: 94500,
    imageUrls: images(
      'photo-1616486338812-3dadae4b4ace',
      'photo-1567016376408-0226e4d0c1ea',
      'photo-1616046229478-9901c5536a45'
    ),
    stock: 9
  },
  {
    name: 'Insulated Steel Bottle',
    description: 'Leak-resistant bottle that keeps drinks cold or hot through the day.',
    category: 'Outdoor',
    price: 42500,
    imageUrls: images(
      'photo-1602143407151-7111542de6e8',
      'photo-1523362628745-0c100150b504',
      'photo-1500530855697-b586d89ba3ee'
    ),
    stock: 45
  },
  {
    name: 'Wireless Charging Dock',
    description: 'Compact charging stand for phones, earbuds, and watch accessories.',
    category: 'Tech',
    price: 76000,
    imageUrls: images(
      'photo-1586953208448-b95a79798f07',
      'photo-1516321497487-e288fb19713f',
      'photo-1517336714731-489689fd1ca8'
    ),
    stock: 16
  }
];

async function backfillProductImages() {
  await Promise.all(
    products.map((product) => {
      return ProductModel.updateOne(
        { name: product.name },
        {
          $set: {
            imageUrl: product.imageUrls[0],
            imageUrls: product.imageUrls,
            price: product.price
          }
        }
      );
    })
  );
}

async function seedDefaults() {
  const userCount = await UserModel.countDocuments();
  if (!userCount) {
    await UserModel.create({
      username: 'admin',
      name: 'Store Admin',
      passwordHash: await bcrypt.hash('password123', 10)
    });
    logger.info('seed:admin_created');
  }

  const productCount = await ProductModel.countDocuments();
  if (!productCount) {
    await ProductModel.insertMany(products);
    logger.info('seed:products_created', { count: products.length });
  } else {
    await backfillProductImages();
    logger.info('seed:product_images_backfilled');
  }
}

module.exports = { seedDefaults };

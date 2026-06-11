const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: '' },
    imageUrls: { type: [String], default: [] },
    stock: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', category: 'text' });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = { ProductModel };

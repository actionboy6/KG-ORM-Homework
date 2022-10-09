// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model: Tag,
    unique: false
  },
});
// Categories have many Products
Categories.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: Tag,
    unique: false
  },
  as: 'Product_Tag'
})
// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

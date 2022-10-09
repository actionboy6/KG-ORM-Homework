const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
    try {
      const categoryData = await Category.findALL({
        include: [{ model: Product}],
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500),json(err);
    }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!categoryData) {
      res.status(404).json({ message: 'Category not found, please select new category.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const locationData = await Category.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return Product.findAll({ where: {category_id: req.params.id} });
    })
    const categoryIDs = category.map(({ tag_id }) => tag_id);
    const newCategoryIDs = req.body.tagIDs
      .filter((tag_id) => !newCategoryIDs.includes(tag_id))
      .map((tag_id) => {
        return {
          category_id: req.params.id,
        }
      })
    });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found. Please find new category to delete.'});
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

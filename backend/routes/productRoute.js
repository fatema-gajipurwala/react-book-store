import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const shopId = req.query.shopId ? { shopId: req.query.shopId } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const products = await Product.find({ ...category, ...searchKeyword, ...shopId }).sort(
    sortOrder
  );
  res.send(products);
});

router.get('/categories', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const shopId = req.query.shopId ? { shopId: req.query.shopId } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const categories = await Product.find({ ...category, ...searchKeyword, ...shopId }).sort(
    sortOrder
  ).distinct("category");
  res.send(categories);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});

router.delete('/:id/reviews/:rid', isAuth, isAdmin, async (req, res) => {
    if (req.params.id) {
        const product = await Product.findById(req.params.id);
        product.numReviews = product.reviews.length-1;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length-1;
        const updatedProduct = await product.save();
        const products = await Product.findOneAndUpdate({_id:req.params.id},{$pull: {reviews: {_id:req.params.rid}}},{new:true},
            function(err, data){
                if(err) {
                  return res.status(401).json({'error' : 'Something went wrong!'});
                } else {
                    res.status(201).send({
                        data: data,
                        message: 'Review deleted successfully!',
                    });
                }
            }
        );
    } else {
        res.status(404).send({ message: 'Something went wrong!' });
    }
});

router.post('/:id/reviews', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.shopId = req.body.shopId;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    shopId: req.body.shopId,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

router.route('/totalproducts').get(function(req,res){
  Product.count({},function(err,result){
      if(err){
        res.send(err);
      }else{
        res.json(result);
      }
  });
});


export default router;

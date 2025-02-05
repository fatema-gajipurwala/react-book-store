import express from 'express';
import Shop from '../models/shopModel';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
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
  const shops = await Shop.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(shops);
});

router.get('/:id', async (req, res) => {
  const shop = await Shop.findOne({ _id: req.params.id });
  if (shop) {
    res.send(shop);
  } else {
    res.status(404).send({ message: 'Shop Not Found.' });
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const shopId = req.params.id;
  const shop = await Shop.findById(shopId);
  if (shop) {
    shop.name = req.body.name;
    shop.image = req.body.image;
    shop.owner = req.body.owner;
    shop.phone = req.body.phone;
    shop.description = req.body.description;
    const updatedShop = await shop.save();
    if (updatedShop) {
      return res
        .status(200)
        .send({ message: 'Shop Updated', data: updatedShop });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Shop.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedShop = await Shop.findById(req.params.id);
  if (deletedShop) {
    await deletedShop.remove();
    res.send({ message: 'Shop Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const shop = new Shop({
    name: req.body.name,
    image: req.body.image,
    owner: req.body.owner,
    phone: req.body.phone,
    description: req.body.description,
    address: req.body.address,
  });
  const newShop = await shop.save();
  if (newShop) {
    return res
      .status(201)
      .send({ message: 'New Shop Created', data: newShop });
  }
  return res.status(500).send({ message: ' Error in Creating Shop.' });
});

router.route('/totalshops').get(function(req,res){
  Shop.countDocuments({},function(err,result){
      if(err){
        res.send(err);
      }else{
        res.json(result);
      }
  });
});
export default router;

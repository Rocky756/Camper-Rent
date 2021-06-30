const router = require('express').Router();
const sha256 = require('sha256');
const AddModel = require('../models/addModel');
const { restrictMiddleSeller, sessionMiddleSeller } = require('../middleware/common');

router.use(sessionMiddleSeller);



router.get('/active', restrictMiddleSeller, async (req, res) =>{
  let adds;
  try {
    adds = await AddModel.find({ author: req.session.sellerName, statusActive: true }).lean();
    adds.sort((a,b) => b.createdAt - a.createdAt); 
    adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}));
    // active = 1;
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
  console.log('Я в ручке seller на /, делаю рендер на админку');
  // res.render('sellers/admin', { categories });
  res.render('sellers/admin', { adds });
})

router.get('/archive', restrictMiddleSeller, async (req, res) =>{
  let adds;
  try {
    adds = await AddModel.find({ author: req.session.sellerName, statusActive: false }).lean();
    adds.sort((a,b) => b.createdAt - a.createdAt); 
    adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}))
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
  res.render('sellers/admin', { adds });
})



//////////////////////////////////////////////////////////////////
router.post('/active', restrictMiddleSeller, async (req, res) =>{
  console.log('Зашел в POST');
  console.log(req.body);
  const author = req.session.usersellerName;
  const { title, price, description, region, image, category } = req.body;
  const newProduct = new ProductModel({ title, price, description, region, image, category, author });
  try {
    await newProduct.save();
    console.log('Сохранил в БД');
  } catch (error) {
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {}
    });
  }
  return res.redirect(`/sellers/:${newProduct._id}`);
})

//////////////////////////////////////////////////////////////////
router.get('/new', restrictMiddleSeller, async (req, res) => {
  const categoriesArr = await categoryModel.find();
  // console.log(categoriesArr);
  res.render('sellers/new', { categoriesArr });
});
//////////////////////////////////////////////////////////////////

router.get('/:id', async (req, res) => {
  try {
    console.log('Я в ручке отдельного объявления', req.params.id);
    const add = await AddModel.findById(req.params.id);
    console.log(add);
    res.render('sellers/showAdd', { add });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
})

router.get('/delete/:id', async(req, res) => {
  let add, adds;
  try {
    console.log('Я в ручке удаления объявления', req.params.id);
    add = await AddModel.findByIdAndUpdate({ _id: req.params.id }, { statusActive: false });
    // console.log(add);
    adds = await AddModel.find({ author: req.session.sellerName, statusActive: true }).lean();
    adds.sort((a,b) => b.createdAt - a.createdAt); 
    adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}));
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
  res.render('sellers/admin', { adds });
})

router.get('/recovery/:id', async(req, res) => {
  let add, adds;
  try {
    console.log('Я в ручке удаления объявления', req.params.id);
    add = await AddModel.findByIdAndUpdate({ _id: req.params.id }, { statusActive: true });
    // console.log(add);
    adds = await AddModel.find({ author: req.session.sellerName, statusActive: false }).lean();
    adds.sort((a,b) => b.createdAt - a.createdAt); 
    adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}));
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
  res.render('sellers/admin', { adds });
})



module.exports = router;

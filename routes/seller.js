const router = require('express').Router();
const sha256 = require('sha256');
const AddModel = require('../models/addModel');
const fileUpload = require('express-fileupload');
const { restrictMiddleSeller, sessionMiddleSeller } = require('../middleware/common');

router.use(sessionMiddleSeller);
router.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

router.get('/', restrictMiddleSeller, async (req, res) =>{
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
  // res.render('sellers/admin', { adds });
  res.render('sellers/admin', { adds });
})

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
  // res.render('sellers/admin', { adds });
  res.render('sellers/adds', { adds, layout: false });
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
  res.render('sellers/adds', { adds, layout: false });
})


router.get('/new', restrictMiddleSeller, async (req, res) => {
  res.render('sellers/new', { layout: false });
});

router.post('/active', restrictMiddleSeller, async (req, res) =>{
  const { mainImage, image1, image2, image3, image4 } = req.files;
  for (let i=0; i < req.files.length; i++) {
    req.files[i].mv(`./upload/${req.files[i].name}`);
  }
  const author = req.session.sellerName;
  const { title, price, description, region, category, contacts, 
    brand, model, color, year, sleepingPlace, country, condition, driverLicense } = req.body;
  const add = await new AddModel({ title, author, price, description, region, category, contacts,
    mainImage: `/${mainImage.name}`, image1: `/${image1.name}`, image2: `/${image2.name}`, image3: `/${image3.name}`,
    image4: `/${image4.name}`, brand, model, color, year, sleepingPlace, country, condition, driverLicense });
  await add.save();
  adds = await AddModel.find({ author: req.session.sellerName, statusActive: true }).lean();
  adds.sort((a,b) => b.createdAt - a.createdAt); 
  adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}))
  return res.render(`sellers/admin`, { adds });
})

//////////////////////////////////////////////////////////////////

router.get('/edit/:id', restrictMiddleSeller, async (req, res) => {
  try {
    console.log('Я в ручке редактирования объявления', req.params.id);
    const add = await AddModel.findById(req.params.id);
    // res.sendStatus(200);
    res.render('sellers/editForm', { add, layout: false });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
})

router.post('/edit/:id', restrictMiddleSeller, async (req, res) => {
  const { mainImage, image1, image2, image3, image4 } = req.files;
  for (let i=0; i < req.files.length; i++) {
    req.files[i].mv(`./upload/${req.files[i].name}`);
  }
  const author = req.session.sellerName;
  const { title, price, description, region, category, contacts, 
    brand, model, color, year, sleepingPlace, country, condition, driverLicense } = req.body;
  const add = await AddModel.findByIdAndUpdate(req.params.id, { title, author, price, description, region, category, contacts,
    mainImage: `/${mainImage.name}`, image1: `/${image1.name}`, image2: `/${image2.name}`, image3: `/${image3.name}`,
    image4: `/${image4.name}`, brand, model, color, year, sleepingPlace, country, condition, driverLicense });
  let adds = await AddModel.find({ author: req.session.sellerName, statusActive: true }).lean();
  adds.sort((a,b) => b.createdAt - a.createdAt); 
  adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}))
  return res.render(`sellers/admin`, { adds });
})

//////////////////////////////////////////////////////////////////

router.get('/:id', restrictMiddleSeller, async (req, res) => {
  try {
    console.log('Я в ручке отдельного объявления', req.params.id);
    const add = await AddModel.findById(req.params.id);
    console.log(add);
    res.render('sellers/showAdd', { add, layout: false });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
})

router.get('/delete/:id', restrictMiddleSeller, async(req, res) => {
  let add, adds;
  try {
    console.log('Я в ручке архивирования объявления', req.params.id);
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
  res.render('sellers/admin', { adds, layout: false });
})

router.get('/recovery/:id', restrictMiddleSeller, async(req, res) => {
  let add, adds;
  try {
    console.log('Я в ручке восстановления объявления', req.params.id);
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
  res.render('sellers/admin', { adds, layout: false });
})

router.get('/realdelete/:id', restrictMiddleSeller, async(req, res) => {
  let add, adds;
  try {
    console.log('Я в ручке удаления объявления', req.params.id);
    add = await AddModel.deleteOne({ _id: req.params.id });
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
  res.render('sellers/admin', { adds, layout: false });
})



module.exports = router;

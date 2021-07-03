require('dotenv').config();
const router = require('express').Router();
const sha256 = require('sha256');
const UserModel = require('../models/userModel');
const SellerModel = require('../models/sellerModel');
const AddModel = require('../models/addModel');
const { sessionMiddle, restrictMiddleUser, sessionMiddleSeller } = require('../middleware/common');

router.use(sessionMiddle);
router.use(sessionMiddleSeller);


router.get('/', async (req, res) => {
  console.log('Зашел на главную');
  let adds;
  try {
    adds = await AddModel.find({ statusActive: true }).lean();
    adds.sort((a,b) => b.createdAt - a.createdAt); 
    adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}));
    // active = 1;
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
  res.render('mainPage', { adds });
});

router.get('/add/:id', async (req, res) => {
  try {
    console.log('Я в ручке отдельного объявления', req.params.id);
    const add = await AddModel.findById(req.params.id).lean();;
    // console.log(add);
    const seller = await SellerModel.findOne({ login: add.author }).lean();
    // console.log(seller);
    res.render('users/openAdd', { add, seller, layout: false });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {}
    })
  }
})

router.get('/login', (req, res) => {
  res.render('reqLog/loginForm');
})

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  console.log(login);
  console.log(password);
  const user = await UserModel.findOne({ login });
  const seller = await SellerModel.findOne({ login });
  // console.log(user.password);
  // console.log(sha256(password));
  // console.log(user.status);
  // console.log(user);
  // console.log(seller);
  if (user || seller) {
    if (seller?.password == sha256(password) && seller?.status == 'Продавец') {
        req.session.sellerName = seller.login;
        req.session.seller = seller.status;
        res.redirect('/seller');
    } else if(user?.password == sha256(password) && user?.status == 'Покупатель') {
      console.log('Я в покупателе');
        req.session.username = user.login;
        res.redirect('/');
    } else {
      const message = 'Неверный пароль';
      res.render('reqLog/loginForm', { message });
    }
  } else {
    const message = 'Неверный логин';
      res.render('reqLog/loginForm', { message });
  }
})

router.get('/signup', (req, res) => {
  res.render('reqLog/registerForm')
});

router.post('/signup', async (req, res) => {
  console.log(req.body);
  const { login, email, password, status1, status2 } = req.body;
  const checkLogin = await UserModel.checkUniqueLogin(login);
  const checkEmail = await UserModel.checkUniqueLogin(email);
  console.log(login, email, password, status1, status2);
  if (login == checkLogin?.login) {
    const message = 'Уже существует пользователь с таким логином';
    res.render('reqLog/registerForms', { message } );

  } else if (email == checkEmail?.email) {
    const message = 'Уже существует пользователь с таким email';
    res.render('reqLog/registerForms', { message } );
  } else if (status2 ) {
  // } else if (status == 'Продавец') {
    console.log('Я в продавце');
    const seller = new SellerModel({ login, email, password: sha256(password), status: status2 });
    await seller.save();
    req.session.sellerName = seller.login;
    req.session.seller = seller.status;
    console.log('Сессии -  имя:', req.session.sellerName, 'статус:', req.session.seller );
    // res.redirect('/seller');
    res.redirect('/seller');
  } else if (status1) {
  // } else if (status == 'Покупатель') {
    console.log('Я в покупателе');
    const user = new UserModel({ login, email, password: sha256(password), status: status1 });
    await user.save();
    req.session.username = user.login;
    console.log('Сессии -  имя:', req.session.username);
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  console.log('Зашел в logout');
  req.session.destroy();
  res.cookie('userCockie', '00', { expires: new Date() });
  res.redirect('/');
});

module.exports = router;

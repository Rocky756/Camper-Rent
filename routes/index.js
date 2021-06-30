require('dotenv').config();
const router = require('express').Router();
const sha256 = require('sha256');
const UserModel = require('../models/userModel');
const SellerModel = require('../models/sellerModel');
const { sessionMiddle, sessionMiddleSeller } = require('../middleware/common');

router.use(sessionMiddle);
router.use(sessionMiddleSeller);

router.get('/', (req, res) => {
  res.render('mainPage');
});

router.get('/login', (req, res) => {
  res.render('reqLog/loginForm');
})

router.post('/login', async (req, res) => {
  console.log(req.body);
  const { login, password } = req.body;
  const user = await UserModel.findOne({ login });
  const seller = await SellerModel.findOne({ login });
  if (user || seller) {
    if (seller.password === sha256(password) || seller.status == 'Продавец') {
        req.session.sellerName = seller.login;
        req.session.seller = seller.status;
        res.redirect('/seller/active');
    } else if(user.password === sha256(password) || user.status == 'Покупатель') {
        req.session.username = user.login;
        res.redirect('/');
    } else {
      const message = 'Неверный пароль';
      res.render('reqLog/loginForm', { message } );
    }
  } else {
    const message = 'Неверный логин';
      res.render('reqLog/loginForm', { message } );
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
    res.redirect('/seller/active');
  } else if (status1) {
  // } else if (status == 'Покупатель') {
    console.log('Я в покупателе');
    const user = new UserModel({ login, email, password: sha256(password), satus: status1 });
    await user.save();
    req.session.username = user.login;
    console.log('Сессии -  имя:', req.session.username);
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.cookie('userCockie', '00', { expires: new Date() });
  res.redirect('/');
});

module.exports = router;

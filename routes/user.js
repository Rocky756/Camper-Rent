require('dotenv').config();
const router = require('express').Router();
const sha256 = require('sha256');
const UserModel = require('../models/userModel');
const SellerModel = require('../models/sellerModel');
const AddModel = require('../models/addModel');
const { sessionMiddle, restrictMiddleUser, sessionMiddleSeller } = require('../middleware/common');

router.get('/showselleradd/:id', async (req, res) => {
  const seller = await SellerModel.findById(req.params.id).lean();
  let adds = await AddModel.find({ author: seller.login, statusActive: true }).lean();
  adds.sort((a,b) => b.createdAt - a.createdAt); 
  adds = adds.map((el) => ({...el, createdAt: new Date(el.createdAt).toLocaleDateString()}));
  res.render('users/sellerAdds', { adds, layout: false })

})

router.get('/addfavorites/:id', restrictMiddleUser, async (req, res) =>{
  let user = await UserModel.findOne({ login: req.session.username }).lean();
  let add = await AddModel.findById(req.params.id).lean();
  count = 0;
  // console.log('ID объявления >>>>>',typeof(add._id));
  // console.log('Проверка>>>>>>>>>>>>>>>>', toString(user.chosen[3]._id) == toString(add._id));
  // arr = Array.from(user.chosen)
  // console.log(typeof(arr));
  // console.log(arr);
  const arr = [];
  for (let i=0; i<user.chosen.length; i++) {
    console.log('Я в цикле');
    console.log( 'ID избранных у Юзера >>>>>', i, user.chosen[i]._id);
    if(toString(user.chosen[i]._id) == toString(add._id)) {
      count += 1;
      console.log('<<<<<Удаляю>>>>>');
      add.favorites -= 1;
      // user.chosen = user.chosen[i].splice(i, 1);
      await AddModel.findByIdAndUpdate(req.params.id, { favorites: add.favorites });
      continue;
    }
    arr.push(user.chosen[i]);
  }
  if (count > 0) {
    await UserModel.updateOne({ login: req.session.username }, { chosen: arr });
  } else if (count == 0) {
    add.favorites += 1;
    arr.push(add);
    await UserModel.updateOne({ login: req.session.username }, { chosen: arr });
    await AddModel.findByIdAndUpdate(req.params.id, { favorites: add.favorites }); 
  }
  // res.sendStatus(200);
  // res.json({ favorites: add.favorites, count: count });
  res.json({ count: count });
})


module.exports = router;

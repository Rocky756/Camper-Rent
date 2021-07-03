const bodyLogger = (req, res, next) => {
  console.log(req.body);
  next();
};

const sessionLogger = (req, res, next) => {
  console.log(req.session);
  next();
};

const sessionMiddle = (req, res, next) => {
  res.locals.username = req.session?.username;
  res.locals.noRegUser = false;
  next();
};
const sessionMiddleSeller = (req, res, next) => {
  res.locals.sellerName = req.session?.sellerName;
  res.locals.seller = req.session?.seller;
  res.locals.noRegUser = false;
  next();
};

const restrictMiddleUser = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.locals.messNoReg = 'Войдите или зарегистрируйтесь для этого действия';
    res.locals.noRegUser = true;
    res.redirect('/login');
  }
};
const restrictMiddleSeller = (req, res, next) => {
  // if (req.session.username) {
  if (req.session.seller) {
    next();
  } else {
    res.locals.messNoReg = 'Войдите или зарегистрируйтесь для этого действия';
    res.locals.noRegSeller = true;
    res.redirect('/login');
  }
};

module.exports = { bodyLogger, sessionLogger, sessionMiddle, sessionMiddleSeller, restrictMiddleUser, restrictMiddleSeller };

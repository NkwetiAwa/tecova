const Users = require('./../models/users');
const router = require('express').Router();

router.route('/').post(async(req, res) => {});

router.route('/all').post(async(req, res) => {
  const { token } = req.body;
  const checker = await Users.findOne({ _id: token, isAdmin: true });
  if ( checker ) {
    const users = await Users.find({ _id: { $ne: token }}).sort({ createdAt: 'DESC' });
    return res.json({
      stat: true,
      users: users
    });
  } else {
    return res.json({
      stat: false,
      err: -1
    });
  }
});

router.route('/delete').post(async(req, res) => {
  const { token, accid } = req.body;
  const checker = await Users.findOne({ _id: token, isAdmin: true });
  if(checker) {
    await Users.findByIdAndDelete( accid );
    return res.json({
      stat: true
    });
  }else {
    return res.json({
      stat: false,
      err: -1
    });
  }
});

router.route('/make-admin').post(async(req, res) => {
  const { token, accid } = req.body;
  const checker = await Users.findOne({ _id: token, isAdmin: true });
  if ( checker ) {
    const updater = await Users.findByIdAndUpdate( accid, { isAdmin: true });
    return res.json({
      stat: true,
      data: updater
    });
  } else {
    return res.json({
      stat: false,
      err: -1
    });
  }
});


module.exports = router;
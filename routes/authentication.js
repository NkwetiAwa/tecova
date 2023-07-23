const Users = require('./../models/users');
const router = require('express').Router();

router.route("/get-started").post(async(req, res) => {
  const { name, email, password, id, matricle } = req.body;

  const newUser = new Users();
  newUser.name = name;
  newUser.email = email;
  newUser.id = id;
  newUser.matricle = matricle;
  newUser.password = newUser.generateHash(password);

  try{
    const saver = await newUser.save()
    if(saver){
      return res.json({ stat: true, token: saver._id });
    }else{
      return res.json({ stat: false });
    }
  }catch{
    return res.json({ stat: false, err: -1 })
  }
});

router.route("/login").post(async(req, res) => {
  const { mail, pass } = req.body;

  const user = await Users.findOne({ email: mail });
  if(user){
    if(!user.validPassword(pass)) {
      return res.send({
        stat: false,
        err: -1
      });
    }else{
      return res.send({
        stat: true,
        token: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }
  }else{
    return res.send({
      stat: false,
      err: 0
    });
  }
});


module.exports = router;
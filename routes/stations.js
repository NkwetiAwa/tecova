const Users = require('./../models/users');
const Stations = require('./../models/stations');
const router = require('express').Router();

router.route('/').post(async(req, res) => {
  const { userid } = req.body;
  const checker = await Users.findOne({ _id: userid, isBlocked: false });
  if( checker ){
    const stations = await Stations.find();
    return res.json({
      stat: true,
      stations: stations
    });
  } else {
    return res.json({
      stat: false,
      err: -1
    });
  }
});

router.route('/new').post(async(req, res) => {
  const { 
    userid,
    type,
    position,
    active,
    lastMile,
    numberOfSleeves,
    comment,
    center,
    name
  } = req.body;
  const checker = await Users.findOne({ _id: userid, isAdmin: true });
  if ( checker ) {
    const newStation = new Stations();
    newStation.userid = userid;
    newStation.type = type;
    newStation.position = position;
    newStation.active = active;
    newStation.lastMile = lastMile;
    newStation.numberOfSleeves = numberOfSleeves;
    newStation.comment = comment;
    newStation.center = center;
    newStation.name = name;

    const saver = await newStation.save();
    return res.json({
      stat: true,
      station: saver._id,
    });
  } else {
    return res.send({
      stat: false,
      err: -1
    })
  }
});

router.route('/delete').post(async(req, res) => {
  const { token, statid } = req.body;
  const checker = await User.findOne({ _id: token, isAdmin: true });
  if(checker){
    await Stations.findByIdAndDelete(statid);
    return res.json({
      stat: true
    });
  } else {
    return res.json({
      stat: false,
      err: -1
    })
  }
})


module.exports = router;
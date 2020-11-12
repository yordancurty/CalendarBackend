const router = require("express").Router();
const passport = require("passport");


//const { ObjectId } = require("mongoose").Types;

const ActivityTask = require("../models/ActivityTask.model");
const User = require("../models/User.model");

//-------------   Rotas das activityTask --------------

//Read: 

router.get("/activityTask", async (req, res) => {
  try {
    const result = await ActivityTask.find().populate("user");

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Details

router.get("/activityTask/:id", async (req, res) => {
  try {
    console.log("conectou a  /activityTask/:id ")
    const { id } = req.params;

    const result = await ActivityTask.findOne({ _id: id });

    console.log(result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
);

//Read somente para o perfil do usuário:

router.get("/activityTask/user/:userId",
passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    console.log("conectou a  /activityTask/user/:id ")
    
    req.body.user = req.params.userId;

    const result = await ActivityTask.find({user: req.user._id}).populate("user");

    console.log("prod READ result = ", result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//Create:

router.post(
  "/activityTask/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.body.user = req.params.userId;

      const resultActivityTask = await ActivityTask.create(req.body);

      console.log("prod POST result = ", req.body)

      return res.status(201).json({ created: { resultActivityTask} });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  }
);

//Update:

router.patch(
  "/activityTask/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await ActivityTask.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      console.log(result);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
);


//Delete:

router.delete(
  "/activityTask/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await ActivityTask.deleteOne({ _id: id });

      console.log(result);

      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;

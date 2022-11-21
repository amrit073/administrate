const { User } = require("../db");
const { compare, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { env } = require("process");
const loginHandler = async (req, res) => {
  try {
    const { userName, password, roles: roles } = req.body;
    if (!(userName && password && roles)) {
      res.status(400).send("all field required");
    }
    var user = await User.findOne({ where: { userName: userName } });
    if (user && compare(password, user.password)) {
      if (user.roles == roles) {
        const token = sign({ userName, roles, password }, env.KEY, {
          expiresIn: "2h",
        });

        user = user.toJSON();
        user.token = token;
        res.status(200).send(user);
      } else {
        res.status(400).send("invalid roles");
      }
    } else {
      res.status(400).send("invalid credentials");
    }
  } catch (e) {
    console.log(e);
  }
};

const registerHandler = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password, roles } = req.body;
    if (!(userName && password && roles)) {
      res.status(400).send("all input field required");
    }
    const oldUser = await User.findOne({ where: { userName: userName } });
    console.log(oldUser);
    if (oldUser) {
      return res
        .status(400)
        .send(`user already exist name: ${oldUser.userName}`);
    } else {
      var excryptedPassword = (await hash(password, 10)).toString();
      const user = await User.create({
        userName: userName,
        password: excryptedPassword,
        roles: roles,
      }).catch((e) => console.log(e));
      const token = sign(
        { userName: userName, roles: roles, password: password },
        env.KEY,
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
      res.send(user);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
module.exports = { loginHandler, registerHandler };

const apiHome = (req, res) => {
  console.log(req.body);
  res.send("thisisfrom api controllers");
};

const protectEd = (req, res) => {
  res.send(`hello ${req.user.userName}`);
};

const getAll = async (req, res) => {
  res.send("hi:where");
};

module.exports = { apiHome, protectEd, getAll };

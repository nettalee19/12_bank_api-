const fs = require('fs');
const users = require('../data/users.json');

const usersController = {
  getAllUsers(req, res) {
    return res.status(200).send(users);
  },
  getUserById(req, res) {
    const { id } = req.params;
    const user = users.find(u => u.id == id);
    if (user) {
      return res.status(200).send(user);
    }
    else {
      return res.status(404).send("User not found.");
    }
  },
  deposit(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount && !isNaN(amount) && amount > 0) {
      const user = users.find(u => u.id == id);
      if (user) {
        user.cash += amount;
        try {
          fs.writeFileSync('./data/users.json', JSON.stringify(users));
          return res.status(200).json("Deposit was successful");
        }
        catch (err) {
          console.log(err)
          res.status(500).json("Internal error, please try again");
        }
        return res.status(200).send(user);
      }
      else { return res.status(404).send("User not found."); }
    }
    else {
      return res.status(400).send("Invalid request. Please provide amount to deposit that is a valid positive number");
    }
  },
  setcredit(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount && !isNaN(amount) && amount >= 0) {
      const user = users.find(u => u.id == id);
      if (user) {
        user.credit = amount;
        try {
          fs.writeFileSync('./data/users.json', JSON.stringify(users));
          return res.status(200).json("Setting credit was successful");
        }
        catch (err) {
          console.log(err)
          res.status(500).json("Internal error, please try again");
        }
        return res.status(200).send(user);
      }
      else { return res.status(404).send("User not found."); }
    }
    else {
      return res.status(400).send("Invalid request. Please provide amount that is a valid positive number");
    }
  }
}

module.exports = usersController;
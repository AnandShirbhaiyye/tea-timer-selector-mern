const User = require('../models/User');

const saveUserData = async (req, res) => {
  try {
    const userData = req.body; 
    const newUser = new User(userData); 
    await newUser.save(); 
    res.status(201).send({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = {
  saveUserData, 
};

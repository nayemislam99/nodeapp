const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONOG_DB_ATLAS);
    console.log('Monogdb atlas successfully connect 👏');
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoConnect;

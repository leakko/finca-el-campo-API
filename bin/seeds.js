require("dotenv/config");
require('../db/index');

const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User.model");
const Celebration = require("../models/Celebration.model");

const randomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

let users = [];

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Database clear"))
    .then(() => {
      /** Create data here */
      for (let i = 0; i < 5; i++) {
        users.push({
          email: faker.internet.email(),
          password: "12345678",
          fullName: faker.name.findName(),
          DNI: faker.datatype.number(),
          phone: faker.phone.phoneNumber()
        });
      }
      console.log(users[0].email);
      return User.create(users);
    })
    .then((dbusers) => {
      users = dbusers;
      const celebrations = [];
      for (let i = 0; i < 10; i++) {
        celebrations.push({
          date: faker.date.between('2021-09-31', '2021-12-5'),
          client: randomArrayElement(users)._id,
        });
      }
      return Celebration.insertMany(celebrations);
    })
    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
const devData = require("../data/development-data/index");
const seed = require("./seed.js");
const db = require("../connection.js");


const runSeed = () => {
  console.log("Starting seeding process...")

  return seed(devData)
  .then(() =>{
    console.log("Seeded successfully!")
    return db.end();
  })
  .catch((err)=>{
    console.error("Seeding failed", err);
    return db.end()
  })

}

runSeed();

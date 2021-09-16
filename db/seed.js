// // grab our client with destructuring from the export in index.js
const { client } = require('./index');



async function testDB() {
  try {
    client.connect();
    const { rows } = await client.query(`SELECT * FROM users;`);
    console.log(rows);
    // const users = await getAllUsers();
    // console.log("getAllUsers", users);
  } catch (error) {
    throw error;
  } finally {
    client.end()
  }
};
// this function should call a query which drops all tables from our database
async function dropTables() {
    try {
        await client.query(`
          DROP TABLE IF EXISTS users;
        `);
    } catch (error) {
      throw error; 
    }
  }
  
async function createTables() {
    try {
      await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
      `);
    } catch (error) {
      throw error;
    }
  }
  
async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
    } catch (error) {
      throw error;
    }
    } 
  
  

testDB();

// rebuildDB()
// .then(testDB)
//   .catch(console.error)
//   .finally(() => client.end());

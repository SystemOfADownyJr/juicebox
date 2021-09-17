// // grab our client with destructuring from the export in index.js
const { 
  client,
  createUser,
  getAllUsers
 } = require('./index');

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS usertable;
    `);

    console.log("Finished Dropping Tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error; 
    }
  }
  
async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
      CREATE TABLE usertable (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        location varchar(255) NOT NULL,
        active boolean DEFAULT true
      );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({ username: 'albert', password: 'bertie99' });
    await createUser({ username: 'sandra', password: '2sandy4me' });
    await createUser({ username: 'glamgal', password: 'soglam' });

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}
async function rebuildDB() {
  try {
    client.connect();
  
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
      }
    } 
    
    
async function testDB() {
      try {
        console.log("Starting to test database...");

        const users = await getAllUsers();
        console.log("getAllUsers:", users);
        
        console.log("Tests Complete!");
      } catch (error) {
        console.error("Error With Testing");
        throw error;
      }
    }
      
      
rebuildDB()
  .then(testDB)
  .catch (console.error) 
  .finally(() => client.end());



import { Sequelize } from 'sequelize'

export const db = new Sequelize({
    // the type of database we will use
    dialect: "sqlite",
    // the name of the file where data will pe stored
    storage: "books.db"

})

// this method will prepare the connection to the datavas
export const synchronizeDatabase = async () => {
    // tests the connection by trying to authenticate
    await db.authenticate();
    // creates/updates the tables at the db level
    await db.sync(); // use { alter: true } during dev if you tweak models
}
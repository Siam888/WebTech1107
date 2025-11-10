// import the database defined in the config server
import { db } from "./config.js"

// import the data types available in sequelize
import { DataTypes } from "sequelize"

// define a new table with the name Book
export const Book = db.define("Book", {
    id: {
        // type of a column
        type: DataTypes.INTEGER,
        // primary key
        primaryKey: true,
        // autoIncrement
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { notEmpty: true }
    },
    author: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: { notEmpty: true }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // validate that the value is within range
        validate: { min: 0, max: 9999 }
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
    {
        indexes: [
            {
                //define a unique constraint based on title, year and author
                unique: true,
                fields: ['title', 'year', 'author']
            }
        ]
    }
);
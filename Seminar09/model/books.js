import { DataTypes, Sequelize } from "sequelize"

// First let's define a new connection to the database
const db = new Sequelize({
    dialect: "sqlite",
    storage: "books.db"
})

// Let's define our model
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
        ],
        timestamps: false
    }
);

export async function syncDB() {
    await db.sync({ force: true })

    await seed();
}

async function seed() {
    await Book.bulkCreate(
        [
            {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                year: 2008,
                pages: 464
            },
            {
                title: 'The Pragmatic Programmer',
                author: 'Andrew Hunt',
                year: 1999,
                pages: 352
            },
            {
                title: 'You Don\'t Know JS Yet',
                author: 'Kyle Simpson',
                year: 2020,
                pages: 143
            },
            {
                title: 'Refactoring',
                author: 'Martin Fowler',
                year: 1999,
                pages: 431
            },
            {
                title: 'JavaScript: The Good Parts',
                author: 'Douglas Crockford',
                year: 2008,
                pages: 176
            }
        ]
    );
}
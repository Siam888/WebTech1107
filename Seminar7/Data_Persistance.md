# Data persistence in REST APIs — summary

## Main idea

When you build a REST API, you often get a **good match** between how data is stored on the server and how it is **exposed as resources** to clients. Because of this, **resource modeling is very important**.

## What is data persistence

Data persistence is the ability to **store and keep** the resource data **durably and safely** for a long time.

## Design tip

Before coding, design the persistence layer (entities, fields, relationships). You can use a simple tool like **dbdiagram** to draw your tables and relations.

## How we persist data (databases)

Most of the time we use **databases** to persist data:

### Relational (SQL)

- Data in **tables with relations** (foreign keys, joins)
- Strong structure, transactions, constraints
- Examples: **MySQL**, **PostgreSQL**, **Microsoft SQL Server**

### Non-relational (NoSQL)

- Data is **not in tables**, uses other models: **documents**, **graphs**, **key–value**, **wide-column**
- Flexible schema, scales differently
- Examples: **MongoDB**, **Cassandra**, **Redis**

## Why this matters for REST

- A clear **resource model** in the API that aligns with the **data model** in the database makes the API **easier to understand and maintain**.
- It can also improve **performance** (fewer joins/transformations) and reduce bugs, because the API representation is close to the stored data.

## SQLite

Sqlite is a serverless SQL database, it needs no setup and keeps all the data in one file and it has zero configurations so it can be used as-is
In order for an application to communicate with the database it needs a database driver which:

- Opens connection to the databse
- Send queries to be executed and binds parameters
- Handles transactions
- Translates types (DB data types <-> our programming language's types)
- Streams results back

There are two ways to interact with the DB with:

1. Raw SQL
2. ORM ( Object relational mapper )
    - An ORM allows for defining a model/relations in code, it generates SQL and executes via the driver
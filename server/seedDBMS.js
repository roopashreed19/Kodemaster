const mongoose = require('mongoose');
require('dotenv').config();

const DBMS = require('./models/DBMS.js');

const dbmsData = [
    {
        topicId: "sql-basics",
        title: "The Interactive Terminal",
        conceptTitle: "SQL (Structured Query Language) Practice",
        realWorldScenario: "This is a live terminal connected directly to your database. Instead of answering multiple-choice questions, you must craft precise queries to retrieve exactly what the system needs.",
        technicalDeepDive: "SQL is a declarative language. You specify exactly WHAT data you want, and the database engine figures out HOW to retrieve it. We are using an in-memory SQLite engine to evaluate your logic in real-time.",
        questions: [
            {
                id: "db1",
                type: "query",
                questionText: "Write a query to retrieve ALL columns from the 'users' table.",
                initScript: "CREATE TABLE users (id INTEGER, name TEXT);\nINSERT INTO users VALUES (1, 'Alice');\nINSERT INTO users VALUES (2, 'Bob');",
                expectedOutput: "1|Alice\n2|Bob",
                explanation: "Using SELECT * pulls every available column from the targeted table. The system verified your output rows accurately match the stored data."
            },
            {
                id: "db2",
                type: "query",
                questionText: "We need the names of users whose id is exactly 3. Only return the 'name' column.",
                initScript: "CREATE TABLE users (id INTEGER, name TEXT);\nINSERT INTO users VALUES (1, 'Alpha');\nINSERT INTO users VALUES (2, 'Beta');\nINSERT INTO users VALUES (3, 'Charlie');",
                expectedOutput: "Charlie",
                explanation: "The WHERE clause reliably filters out rows. By explicitly requesting only 'name', you optimized data transmission."
            },
            {
                id: "db3",
                type: "query",
                questionText: "Return the number of total rows in the 'employees' table. Name the column 'Total'.",
                initScript: "CREATE TABLE employees (id INTEGER);\nINSERT INTO employees VALUES (1), (2), (3), (4);",
                expectedOutput: "4",
                explanation: "The COUNT() aggregate function combined with an AS alias allowed you to format aggregate data easily."
            },
            {
                id: "db4",
                type: "query",
                questionText: "Retrieve all products costing more than $50. Return all columns.",
                initScript: "CREATE TABLE products (name TEXT, price INTEGER);\nINSERT INTO products VALUES ('Mouse', 40);\nINSERT INTO products VALUES ('Keyboard', 100);\nINSERT INTO products VALUES ('Monitor', 200);",
                expectedOutput: "Keyboard|100\nMonitor|200",
                explanation: "By applying greater-than logic (> 50) within the WHERE clause, you effectively minimized the result set to the targeted constraint."
            },
            {
                id: "db5",
                type: "query",
                questionText: "Delete the product named 'Mouse' from the 'products' table. Do not return any rows.",
                initScript: "CREATE TABLE products (name TEXT, price INTEGER);\nINSERT INTO products VALUES ('Mouse', 40);\nINSERT INTO products VALUES ('Keyboard', 100);",
                expectedOutput: "",
                explanation: "DELETE clauses alter existing table states dynamically. No output was returned because DELETE is a modification command, not a retrieval query."
            }
        ]
    },
    {
        topicId: "normalization",
        title: "Avoiding Redundancy",
        conceptTitle: "Database Normalization (JOINs)",
        realWorldScenario: "If every time you save a contact you write down their whole address, and they move, you have to update it everywhere. Normalization is keeping the addresses in one 'Address Book' and linking them via IDs.",
        technicalDeepDive: "Normalization divides large tables into smaller ones. To retrieve complete data, you must stitch them back together using SQL JOIN operations.",
        questions: [
            {
                id: "db6",
                type: "query",
                questionText: "Write a query using INNER JOIN to retrieve the user's name and their city from the 'Users' and 'Addresses' tables.",
                initScript: "CREATE TABLE Addresses (id INTEGER PRIMARY KEY, city TEXT); CREATE TABLE Users (id INTEGER, name TEXT, address_id INTEGER); INSERT INTO Addresses VALUES (1, 'New York'), (2, 'London'); INSERT INTO Users VALUES (101, 'Alice', 1), (102, 'Bob', 2);",
                expectedOutput: "Alice|New York\nBob|London",
                explanation: "An INNER JOIN matches rows where the Foreign Key (address_id) equals the Primary Key (id) in the connected table."
            },
            {
                id: "db7",
                type: "query",
                questionText: "Retrieve all users and their cities. If a user doesn't have an address, still show the user but leave the city blank using a LEFT JOIN.",
                initScript: "CREATE TABLE Addresses (id INTEGER PRIMARY KEY, city TEXT); CREATE TABLE Users (id INTEGER, name TEXT, address_id INTEGER); INSERT INTO Addresses VALUES (1, 'New York'); INSERT INTO Users VALUES (101, 'Alice', 1), (102, 'Bob', NULL);",
                expectedOutput: "Alice|New York\nBob|",
                explanation: "A LEFT JOIN guarantees that all rows from the left table (Users) are returned, even if there is no match in the right table."
            },
            {
                id: "db8",
                type: "query",
                questionText: "List the unique 'city' names from the 'Addresses' table exactly once. Use the DISTINCT keyword.",
                initScript: "CREATE TABLE Addresses (city TEXT); INSERT INTO Addresses VALUES ('New York'), ('London'), ('New York'), ('Paris'), ('London');",
                expectedOutput: "New York\nLondon\nParis",
                explanation: "DISTINCT filters out duplicate records in the result set, ensuring you only get unique values."
            },
            {
                id: "db9",
                type: "query",
                questionText: "Find the total number of users who live in 'London'. Name the result column 'London_Users'. Note: use INNER JOIN and COUNT().",
                initScript: "CREATE TABLE Addresses (id INTEGER PRIMARY KEY, city TEXT); CREATE TABLE Users (id INTEGER, name TEXT, address_id INTEGER); INSERT INTO Addresses VALUES (1, 'London'), (2, 'Paris'); INSERT INTO Users VALUES (101, 'Alice', 1), (102, 'Bob', 1), (103, 'Charlie', 2);",
                expectedOutput: "2",
                explanation: "By combining JOIN and COUNT() with a WHERE clause, you can perform powerful aggregations across multiple normalized tables."
            },
            {
                id: "db10",
                type: "query",
                questionText: "Add a new address 'Tokyo' with id 3 into the 'Addresses' table.",
                initScript: "CREATE TABLE Addresses (id INTEGER PRIMARY KEY, city TEXT); INSERT INTO Addresses VALUES (1, 'New York');",
                expectedOutput: "",
                explanation: "INSERT statements push new normalized records into their respective standalone tables."
            }
        ]
    },
    {
        topicId: "acid-properties",
        title: "The Unbreakable Vow",
        conceptTitle: "ACID Properties & Constraints",
        realWorldScenario: "ACID ensures the transfer either fully happens or completely fails. Let's practice enforcing database constraints that protect the integrity of your data.",
        technicalDeepDive: "Atomicity, Consistency, Isolation, Durability. We enforce Consistency via constraints like UNIQUE and NOT NULL.",
        questions: [
            {
                id: "db11",
                type: "query",
                questionText: "Create a table named 'Accounts' with two columns: 'id' (INTEGER) and 'balance' (INTEGER, NOT NULL).",
                initScript: "",
                expectedOutput: "",
                explanation: "NOT NULL is a constraint ensuring data Consistency. An account cannot exist without a defined balance."
            },
            {
                id: "db12",
                type: "query",
                questionText: "Insert an account with id 1 and balance 500 into 'Accounts'.",
                initScript: "CREATE TABLE Accounts (id INTEGER, balance INTEGER NOT NULL);",
                expectedOutput: "",
                explanation: "Simple insertion testing Atomicity. It fully succeeds."
            },
            {
                id: "db13",
                type: "query",
                questionText: "Transfer 100 from Account 1 to Account 2. Write an UPDATE to set Account 1's balance to 400. (Assume Account 2 update happens next).",
                initScript: "CREATE TABLE Accounts (id INTEGER, balance INTEGER); INSERT INTO Accounts VALUES (1, 500), (2, 0);",
                expectedOutput: "",
                explanation: "Transactions bundle multiple UPDATE statements into a single Atomic operation."
            },
            {
                id: "db14",
                type: "query",
                questionText: "Find all Accounts with a balance exactly equal to 0.",
                initScript: "CREATE TABLE Accounts (id INTEGER, balance INTEGER); INSERT INTO Accounts VALUES (1, 400), (2, 0), (3, 100), (4, 0);",
                expectedOutput: "2|0\n4|0",
                explanation: "Isolating specific state changes to ensure Consistency checks past transactions."
            },
            {
                id: "db15",
                type: "query",
                questionText: "Delete all Accounts where the balance is less than 0.",
                initScript: "CREATE TABLE Accounts (id INTEGER, balance INTEGER); INSERT INTO Accounts VALUES (1, 50), (2, -10), (3, -500);",
                expectedOutput: "",
                explanation: "Sanitizing invalid database states keeps the ecosystem Consistent and Durable."
            }
        ]
    },
    {
        topicId: "indexing",
        title: "Table of Contents",
        conceptTitle: "Database Indexing & Fast Retrieval",
        realWorldScenario: "Without an index, finding a word in a 1000-page book means reading every single page. Let's practice querying specific text patterns.",
        technicalDeepDive: "While you can't see the B-Tree directly here, you'll use operations like LIKE, ORDER BY, and LIMIT which heavily rely on Indexes for speed in large databases.",
        questions: [
            {
                id: "db16",
                type: "query",
                questionText: "Create an index named 'idx_name' on the 'name' column of the 'Users' table.",
                initScript: "CREATE TABLE Users (id INTEGER, name TEXT);",
                expectedOutput: "",
                explanation: "CREATE INDEX builds a B-Tree structure behind the scenes, making future SELECT queries on the 'name' column lightning fast."
            },
            {
                id: "db17",
                type: "query",
                questionText: "Find all users whose names start with the letter 'A'. (Hint: Use LIKE 'A%')",
                initScript: "CREATE TABLE Users (name TEXT); INSERT INTO Users VALUES ('Alice'), ('Bob'), ('Aaron'), ('Charlie');",
                expectedOutput: "Alice\nAaron",
                explanation: "The LIKE operator is heavily optimized by strings indexes. The % symbol is a wildcard."
            },
            {
                id: "db18",
                type: "query",
                questionText: "Retrieve all products, ordered by 'price' in DESCENDING order (DESC).",
                initScript: "CREATE TABLE Products (name TEXT, price INTEGER); INSERT INTO Products VALUES ('Mouse', 40), ('Laptop', 1000), ('Keyboard', 100);",
                expectedOutput: "Laptop|1000\nKeyboard|100\nMouse|40",
                explanation: "ORDER BY DESC forces the database engine to sort the records. An index on 'price' would make this sort instantaneous."
            },
            {
                id: "db19",
                type: "query",
                questionText: "Retrieve only the top 2 most expensive products. (Hint: combine ORDER BY DESC and LIMIT 2)",
                initScript: "CREATE TABLE Products (name TEXT, price INTEGER); INSERT INTO Products VALUES ('Mouse', 40), ('Laptop', 1000), ('Keyboard', 100);",
                expectedOutput: "Laptop|1000\nKeyboard|100",
                explanation: "LIMIT combined with ORDER BY is a classic pagination and ranking technique."
            },
            {
                id: "db20",
                type: "query",
                questionText: "Find any product containing the word 'Book' anywhere in its name. (Hint: Use LIKE '%Book%')",
                initScript: "CREATE TABLE Products (name TEXT); INSERT INTO Products VALUES ('MacBook'), ('Notebook'), ('Mouse'), ('Bookcase');",
                expectedOutput: "MacBook\nNotebook\nBookcase",
                explanation: "Wildcards on both sides trigger a full table scan, bypassing the Index, which can be computationally expensive!"
            }
        ]
    },
    {
        topicId: "relational-algebra",
        title: "The Math of Tables",
        conceptTitle: "Relational Algebra (Advanced Queries)",
        realWorldScenario: "It is the theoretical foundation of SQL. Imagine a Venn Diagram. You want only the overlapping part of two circles... or the merging of both.",
        technicalDeepDive: "Relational Algebra translates to SQL operators like UNION, INTERSECT, subqueries, and GROUP BY.",
        questions: [
            {
                id: "db21",
                type: "query",
                questionText: "Combine all names from the 'Students' table and 'Teachers' table into one generic list using UNION.",
                initScript: "CREATE TABLE Students (name TEXT); CREATE TABLE Teachers (name TEXT); INSERT INTO Students VALUES ('Alice'), ('Bob'); INSERT INTO Teachers VALUES ('Charlie'), ('Alice');",
                expectedOutput: "Alice\nBob\nCharlie",
                explanation: "UNION mimics the mathematical Set Union, merging two result sets and automatically removing duplicates."
            },
            {
                id: "db22",
                type: "query",
                questionText: "Find the names of people who are BOTH Students and Teachers using INTERSECT.",
                initScript: "CREATE TABLE Students (name TEXT); CREATE TABLE Teachers (name TEXT); INSERT INTO Students VALUES ('Alice'), ('Bob'); INSERT INTO Teachers VALUES ('Charlie'), ('Alice');",
                expectedOutput: "Alice",
                explanation: "INTERSECT mimics Set Intersection, returning ONLY the rows that exist in both queries."
            },
            {
                id: "db23",
                type: "query",
                questionText: "How many employees are in each department? Use GROUP BY department and COUNT(*). Select department and the count.",
                initScript: "CREATE TABLE Employees (name TEXT, department TEXT); INSERT INTO Employees VALUES ('Alice', 'IT'), ('Bob', 'HR'), ('Charlie', 'IT');",
                expectedOutput: "HR|1\nIT|2",
                explanation: "GROUP BY partitions your data into chunks based on matching column values before applying the aggregate function."
            },
            {
                id: "db24",
                type: "query",
                questionText: "Find the name of the employee with the MAXIMUM salary using a Subquery. (e.g. WHERE salary = (SELECT MAX(salary)...) )",
                initScript: "CREATE TABLE Employees (name TEXT, salary INTEGER); INSERT INTO Employees VALUES ('Alice', 5000), ('Bob', 9000), ('Charlie', 7000);",
                expectedOutput: "Bob",
                explanation: "Subqueries let you nest one query inside another sequentially to find dynamic thresholds."
            },
            {
                id: "db25",
                type: "query",
                questionText: "Select all departments that have strictly MORE THAN 1 employee. Use GROUP BY and HAVING COUNT(*) > 1. Select the department only.",
                initScript: "CREATE TABLE Employees (name TEXT, department TEXT); INSERT INTO Employees VALUES ('Alice', 'IT'), ('Bob', 'HR'), ('Charlie', 'IT');",
                expectedOutput: "IT",
                explanation: "HAVING is the equivalent of a WHERE clause, but specifically applied AFTER the GROUP BY aggregations occur."
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await DBMS.deleteMany({});
        await DBMS.insertMany(dbmsData);
        console.log("💾 The DBMS Kingdom has been initialized with 5 Topics!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();

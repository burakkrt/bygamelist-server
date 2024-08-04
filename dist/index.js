"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv_1.default.config({ path: envFile });
console.log(`Using environment file: ${envFile}`);
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'mydatabase';
mongodb_1.MongoClient.connect(mongoUrl)
    .then((client) => {
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    app.get('/', (req, res) => {
        res.send('Hello, world!');
    });
    app.listen(port, () => {
        console.log(`Server is running on port2 ${port}`);
    });
})
    .catch((error) => console.error(error));

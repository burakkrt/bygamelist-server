"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const serverRoute_1 = __importDefault(require("./routes/serverRoute"));
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv_1.default.config({ path: envFile });
console.log(`Using environment file: ${envFile}`);
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
const mongoUsername = encodeURIComponent(process.env.MONGO_USERNAME || '');
const mongoPassword = encodeURIComponent(process.env.MONGO_PASSWORD || '');
const mongoCluster = process.env.MONGO_CLUSTER || '';
const dbName = process.env.DB_NAME || '';
const mongoUrl = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluster}/${dbName}?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    console.log(`Connected to database: ${dbName}`);
    app.use('/v1/server', serverRoute_1.default);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
});

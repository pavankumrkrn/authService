"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Simple GET route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const PORT = 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const loadData = async () => {
    return new Promise((resolve, reject) => {
        https_1.default.get('https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json', (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
            res.on('error', (e) => {
                reject(e);
            });
        });
    });
};
const startServer = async () => {
    try {
        const data = await loadData();
        app.get('/', (req, res) => {
            const { query: { search }, } = req;
            if (search && typeof search === 'string') {
                const dataWithMatchedTitles = Object.entries(data.entities.pages).reduce((acc, [pageId, page]) => {
                    if (page.title.toLowerCase().includes(search.toLowerCase())) {
                        acc.entities.pages[pageId] = page;
                        if (page.level === 0) {
                            acc.topLevelIds.push(pageId);
                        }
                    }
                    return acc;
                }, {
                    entities: {
                        pages: {},
                    },
                    topLevelIds: [],
                });
                return res.json(dataWithMatchedTitles);
            }
            return res.json(data);
        });
        app.listen(PORT, () => {
            console.log(`[server]: Server is running at http://localhost:${PORT}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
startServer();

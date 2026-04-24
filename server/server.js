const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require("fs"); /* 파일 시스템 모듈 */
const cors = require('cors');
const bodyParser = require('body-parser');
//4000이라는 포트번호를 서버에 할당

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// notion-client는 ESM 전용이라 dynamic import 사용
let notion = null;
import('notion-client').then(({ NotionAPI }) => {
    notion = new NotionAPI();
    console.log('Notion API initialized');
}).catch(err => {
    console.error('Failed to load notion-client:', err.message);
});

app.get("/notion-page/:pageId", async (req, res) => {
    if (!notion) {
        return res.status(503).json({ error: "Notion API not ready" });
    }
    try {
        const recordMap = await notion.getPage(req.params.pageId);
        res.json(recordMap);
    } catch (err) {
        console.error("Notion fetch error:", err);
        res.status(500).json({ error: "Failed to fetch Notion page" });
    }
});

app.post("/save-file", (req, res) => {
    console.log(">>> save-file body: " + JSON.stringify(req.body));
    const { path, data } = req.body;
    let responseBody = { result: String, info: String };
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            responseBody.result("fail");
            responseBody.info(err);
            res.status(500).json(responseBody);
        } else {
            console.log("Wrote data success");
            responseBody.result("success");
            res.status(200).json(responseBody);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server on : http://localhost:${PORT}/`);
});

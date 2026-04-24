const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

let notion = null;
import("notion-client").then(({ NotionAPI }) => {
    notion = new NotionAPI();
    console.log("Notion API initialized");
}).catch((err) => {
    console.error("Failed to load notion-client:", err.message);
});

exports.notionProxy = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const pathParts = req.path.split("/").filter(Boolean);
        const pageId = pathParts[pathParts.length - 1];
        if (!pageId) {
            return res.status(400).json({ error: "pageId is required" });
        }
        if (!notion) {
            return res.status(503).json({ error: "Notion API not ready" });
        }
        try {
            const recordMap = await notion.getPage(pageId);
            res.json(recordMap);
        } catch (err) {
            console.error("Notion fetch error:", err);
            res.status(500).json({ error: "Failed to fetch Notion page" });
        }
    });
});

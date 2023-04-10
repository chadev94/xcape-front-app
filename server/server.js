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

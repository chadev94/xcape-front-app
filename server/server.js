const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require("fs"); /* 파일 시스템 모듈 */
const cors = require('cors');
const bodyParser = require('body-parser');
//4000이라는 포트번호를 서버에 할당

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`Okay let's go`);
});

app.post("/save-file", (req, res) => {
    let body = JSON.stringify(req.body.result);
    console.log(">>> saveFile body: " + body);
    fs.writeFile("src/data/merchantList.json", body, (err) => {
        if (err) return console.error(err)
        console.log("Wrote data success ");
    });
});
app.listen(PORT, () => {
    console.log(`Server on : http://localhost:${PORT}/`);
});

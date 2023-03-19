const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
//4000이라는 포트번호를 서버에 할당

app.get("/", (req, res) => {
    res.send(`Okay let's go`);
});
app.listen(PORT, () => {
    console.log(`Server on : http://localhost:${PORT}/`);
});

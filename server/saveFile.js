const express = require("express");
const router = express.Router();
const fs = require("fs"); /* 파일 시스템 모듈 */

router.get("/", (req, res) => {
    let path = req.query.path; /* query를 이용하여 react에서 path를 전달 */
    let body = req.body;
    console.log(">>> saveFile body: " + body);
    fs.writeFile("/", body, (err) => {
        if (err) return console.error(err)
        console.log("Wrote data success ");
    });

    /* readdir에서 path, option, error, items(path에 있는 폴더,파일)를 넘긴다 */
    // fs.readdir(path, {withFileTypes: true}, function(error, items) {
    //     if(error) { /* 에러 처리 */
    //         res.send({error, fileList: [], folderList : []});
    //         return;
    //     }
    //
    //     let files = [];
    //     let folders = [];
    //
    //     for(let item of items) {
    //         /* 폴더인 경우 folders에 추가 */
    //         if(item.isDirectory()) folders.push(item);
    //         else files.push(item);
    //     }
    //
    //     res.send({ fileList: files, folderList : folders }); /* react로 전달 */
    // })

    return;
});

module.exports = router;
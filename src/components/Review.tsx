import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import React, { useState, useEffect } from "react";
// import fs from "fs";

function Review() {
    const [response, setResponse] = useState({});

    const divStyle = {
        WebkitTextFillColor: "white",
    };

    useEffect(() => {
        const NOTION_PAGE_ID = "ce039ebcfdea42b3b941528f76c294b9";
        fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
            .then((res) => res.json())
            .then((resJson) => {
                setResponse(resJson);
            });
    }, []);

    // const createNotionJsonFile = () => {
    //     const NOTION_PAGE_ID = "ce039ebcfdea42b3b941528f76c294b9";
    //     fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
    //         .then((res) => res.json())
    //         .then((resJson) => {
    //             fs.writeFile("../data/review.json", resJson, (err) => {
    //                 if (err) {
    //                     console.log(err);
    //                     return;
    //                 }
    //                 console.log("Json file created successfully");
    //             });
    //         });
    // };

    return (
        <div style={divStyle}>
            <NotionRenderer blockMap={response} fullPage={true} />
        </div>
    );
}

export default Review;

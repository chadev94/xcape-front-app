import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
// import fs from "fs";

type NotionPageProps = {
    pageId: string;
};

function NotionView({ pageId }: NotionPageProps) {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState<boolean>(false);

    const divStyle = {
        WebkitTextFillColor: "white",
    };

    useEffect(() => {
        const NOTION_PAGE_ID = pageId;
        fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
            .then((res) => res.json())
            .then((resJson) => {
                setResponse(resJson);
                setLoading(true);
            });
    }, []);

    return loading ? (
        <div style={divStyle}>
            <NotionRenderer blockMap={response} fullPage={true} hideHeader={true} />
        </div>
    ) : (
        <Loading />
    );
}

export default NotionView;

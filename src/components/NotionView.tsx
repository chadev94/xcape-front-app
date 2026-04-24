import "react-notion-x/src/styles.css";
import "../styles/notion-override.css";
import { NotionRenderer } from "react-notion-x";
import {NotionAPI} from "notion-client";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";

type NotionPageProps = {
    pageId: string;
};

function NotionView({ pageId }: NotionPageProps) {
    const [recordMap, setRecordMap] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const divStyle = {
        WebkitTextFillColor: "white",
    };

    useEffect(() => {
        if (!pageId) return;
        setLoading(true);
        setError(false);
        fetch(`${process.env.REACT_APP_NODE_SERVER_HOST}/notion-page/${pageId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                setRecordMap(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Notion fetch error:", err);
                setError(true);
                setLoading(false);
            });
    }, [pageId]);

    if (loading) return <Loading />;
    if (error) return <div style={{ color: "white", padding: "20px" }}>페이지를 불러오지 못했습니다.</div>;
    if (!recordMap) return null;

    return (
        <div style={divStyle}>
            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} />
        </div>
    );
}

export default NotionView;

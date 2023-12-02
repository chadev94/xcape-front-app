import NotionView from "./NotionView";
import {IMerchant} from "../api";
import {useRecoilValue} from "recoil";
import {merchant} from "../atom";

function Info() {
    const currentMerchant: IMerchant = useRecoilValue(merchant);

    return <NotionView pageId={currentMerchant.usingInfoNotionId} />;
}

export default Info;

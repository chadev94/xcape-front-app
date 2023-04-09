import {useRecoilValue} from "recoil";
import {merchant} from "../atom";
import {useEffect, useState} from "react";

function BusinessIcon() {
    const currentMerchant = useRecoilValue(merchant);
    const [businessIcon, setBusinessIcon] = useState("");
    useEffect(() => {
        setBusinessIcon(currentMerchant.businessIcon);
    }, [currentMerchant, businessIcon]);

    return (
        <div>
            <img className="h-full w-fit m-auto" src={businessIcon} alt="엑스케이프" />
        </div>
    );
}

export default BusinessIcon;

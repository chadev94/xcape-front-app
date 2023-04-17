import { Link, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { IAbility, IMerchant, ITheme } from "../api";
import { abilityList, merchant, themeList } from "../atom";
import { useEffect } from "react";

function Nav() {
    const { merchantCode } = useParams<{ merchantCode: string }>();
    const merchantListJson: IMerchant[] = require("../data/merchantList.json");
    const themeListJson: ITheme[] = require("../data/themeList.json");
    const setCurrentMerchant = useSetRecoilState<IMerchant>(merchant);
    const setCurrentThemeList = useSetRecoilState<ITheme[]>(themeList);

    const highlightActiveLink = (isActive: boolean) => {
        return isActive ? "p-1 sm:p-2 text-lg border border-zinc-500 rounded-sm ml-2 bg-zinc-500 text-zinc-100" : "p-1 sm:p-2 text-lg border border-zinc-500 rounded-sm ml-2 bg-zinc-800 text-zinc-400";
    };

    const findMerchantByCode = (code: string): IMerchant => {
        return merchantListJson.find((merchant: IMerchant) => merchant.code === code)!;
    };

    const findThemesByMerchantId = (merchantId: number): ITheme[] => {
        return themeListJson.filter((theme: ITheme) => theme.merchantId === merchantId)!;
    };

    useEffect(() => {
        if (merchantCode) {
            const currentMerchant = findMerchantByCode(merchantCode);
            setCurrentMerchant(() => currentMerchant);

            const currentThemeList = findThemesByMerchantId(currentMerchant.id);
            setCurrentThemeList(currentThemeList);
            console.log(currentThemeList);
        }
    }, [merchantCode]);

    return (
        <div className="inline-block text-center whitespace-nowrap py-6 border-b border-zinc-500 w-full overflow-x-auto">
            {merchantListJson &&
                merchantListJson.map((merchant, index) => {
                    return (
                        <Link to={"/" + merchant.code} key={merchant.id}>
                            <button className={highlightActiveLink(merchantCode! === merchant.code)} key={index}>
                                {merchant.name}
                            </button>
                        </Link>
                    );
                })}
        </div>
    );
}

export default Nav;

import { Link, useParams } from "react-router-dom";
import merchantList from "../data/merchantList.json";
import { useSetRecoilState } from "recoil";
import { getMerchantDetail, IMerchant, ITheme } from "../api";
import { merchant, themeList } from "../atom";

function Nav() {
    const { merchantCode } = useParams<{ merchantCode: string }>();
    const setThemeList = useSetRecoilState<ITheme[]>(themeList);
    const setMerchant = useSetRecoilState<IMerchant>(merchant);

    const highlightActiveLink = (isActive: boolean) => {
        return isActive ? "p-1 sm:p-2 text-lg border border-zinc-500 rounded-sm ml-2 bg-zinc-500 text-zinc-100" : "p-1 sm:p-2 text-lg border border-zinc-500 rounded-sm ml-2 bg-zinc-800 text-zinc-400";
    };

    const findMerchantIdByCode = (code: string): IMerchant => {
        return merchantList.find((merchant: IMerchant) => merchant.code === code)!;
    };

    const handleOnClick = (code: string) => {
        const currentMerchant = findMerchantIdByCode(code);
        setMerchant(currentMerchant);
        getMerchantDetail(currentMerchant.id).then((res) => {
            setThemeList(res.result.themeList);
        });
    };

    return (
        <div className="inline-block text-center whitespace-nowrap py-6 border-b border-zinc-500 w-full overflow-x-auto">
            {merchantList &&
                merchantList.map((merchant, index) => {
                    return (
                        <Link to={"/" + merchant.code} key={index} onClick={() => handleOnClick(merchant.code)}>
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

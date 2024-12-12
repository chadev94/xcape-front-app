import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IBanner, IMerchant, ITheme } from "../api";
import { bannerList, bannerListCdn, merchant, merchantListCdn, themeList, themeListCdn } from "../atom";
import { useEffect } from "react";

function Nav() {
    const navigate = useNavigate();
    const { merchantCode } = useParams<{ merchantCode: string }>();
    const merchantListJson = useRecoilValue<IMerchant[]>(merchantListCdn);
    const themeListJson = useRecoilValue<ITheme[]>(themeListCdn);
    const bannerListJson = useRecoilValue<IBanner[]>(bannerListCdn);
    const setCurrentMerchant = useSetRecoilState<IMerchant>(merchant);
    const setCurrentThemeList = useSetRecoilState<ITheme[]>(themeList);
    const setCurrentBannerList = useSetRecoilState<IBanner[]>(bannerList);

    const highlightActiveLink = (isActive: boolean) => {
        return isActive ? "text-lg text-white border-b-2" : "text-lg text-[#ededef]/50";
    };

    const findMerchantByCode = (code: string): IMerchant => {
        return merchantListJson.find((merchant: IMerchant) => merchant.code === code)!;
    };

    const findThemesByMerchantId = (merchantId: number): ITheme[] => {
        return themeListJson.filter(
            (theme: ITheme) => theme.merchantId === merchantId && theme.useYn && theme.nameKo !== "test"
        );
    };

    const findBannersByMerchantId = (merchantId: number): IBanner[] => {
        return bannerListJson.filter((banner: IBanner) => banner.merchantId === merchantId);
    };

    useEffect(() => {
        if (merchantListJson.length === 0) {
            navigate("/");
            return;
        }

        if (merchantCode) {
            const currentMerchant = findMerchantByCode(merchantCode);
            setCurrentMerchant(currentMerchant);

            const currentThemeList = findThemesByMerchantId(currentMerchant.id);
            setCurrentThemeList(currentThemeList);

            const currentBannerList = findBannersByMerchantId(currentMerchant.id);
            setCurrentBannerList([...currentBannerList]);
        }
    }, [merchantCode]);

    return (
        <div className="text-center whitespace-nowrap px-2 py-6 w-full overflow-x-auto flex justify-between gap-4">
            {merchantListJson &&
                merchantListJson
                    .filter((merchant) => merchant.useYn)
                    .sort((a, b) => a.order - b.order)
                    .map((merchant, index) => {
                        return (
                            <div>
                                <Link to={"/" + merchant.code} key={merchant.id}>
                                    <button
                                        className={highlightActiveLink(merchantCode! === merchant.code)}
                                        key={index}
                                    >
                                        {merchant.name}
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
        </div>
    );
}

export default Nav;

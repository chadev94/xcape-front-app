import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
    getAbilityListFromCdn,
    getBannerListFromCdn,
    getMerchantListFromCdn,
    getThemeListFromCdn,
    IAbility,
    IBanner,
    IMerchant,
    ITheme,
} from "./api";
import { abilityListCdn, bannerListCdn, merchantListCdn, themeListCdn } from "./atom";
import { useEffect } from "react";

function App() {
    const setMerchantListJson = useSetRecoilState<IMerchant[]>(merchantListCdn);
    const setThemeListJson = useSetRecoilState<ITheme[]>(themeListCdn);
    const setBannerListJson = useSetRecoilState<IBanner[]>(bannerListCdn);
    const setAbilityListJson = useSetRecoilState<IAbility[]>(abilityListCdn);

    useEffect(() => {
        getMerchantListFromCdn()
            .then((merchantList) => {
                setMerchantListJson(merchantList);
                return getThemeListFromCdn();
            })
            .then((themeList) => {
                setThemeListJson(themeList);
                return getBannerListFromCdn();
            })
            .then((bannerList) => {
                setBannerListJson(bannerList);
                return getAbilityListFromCdn();
            })
            .then((abilityList) => {
                setAbilityListJson(abilityList);
            });
    }, []);

    return (
        <div className="sm:w-[500px] mx-auto">
            <Nav />
            <Outlet />
        </div>
    );
}

export default App;

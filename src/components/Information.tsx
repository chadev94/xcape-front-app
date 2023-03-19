import {STORE_INFORMATION} from "../data/information.js";
import ThemeInfo from "./ThemeInfo";

export type ThemeType = {
	id: number,
	nameKo: string,
	mainImagePath?: string | null,
	difficulty: number,
	minParticipantCount: number,
	maxParticipantCount: number,
	genre: string
	abilityList: object[],
}

function Information() {

	return <div>
		<img src="http://xcape.co.kr/m/img/main_visual2/main_visual0.jpg" alt="description" className='w-full'/>
		<img src="http://xcape.co.kr/data/banner/1981899565_f77a3340_xcape-banner.jpg" alt="banner" className='w-full'/>
		<div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3'>
			{STORE_INFORMATION.themeList.map((theme: ThemeType, index) => {
				return <ThemeInfo theme={theme} key={theme.id} index={index}/>;
			})}
		</div>
	</div>;
}

export default Information;

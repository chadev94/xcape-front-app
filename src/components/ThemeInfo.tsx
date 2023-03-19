import {ThemeType} from "./Information";
import {formatNumber} from '../util/util.js'

type ThemeProps = {
    theme: ThemeType,
    index: number
}

function ThemeInfo({theme, index}: ThemeProps) {
    return <div className='w-50'>
        <div>
            <span className='text-amber-500 text-2xl font-semibold mr-2'>{formatNumber(index + 1)}</span>
            <span className='text-3xl font-semibold text-white'>{theme.nameKo}</span>
        </div>
        <div className='h-60'>
            {/* @ts-ignore*/}
            <img src={theme.mainImagePath} alt='없음' className='w-full h-full object-contain'/>
        </div>
        <div>
            <button type='button' className='w-full px-2 py-1 border border-zinc-600 bg-zinc-900
            rounded-sm text-zinc-400 font-xl
            hover:text-zinc-100 hover:border-zinc-100'>실시간 예약하기
            </button>
        </div>
    </div>;
}

export default ThemeInfo;
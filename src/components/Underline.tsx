interface IUnderline {
    tabUnderlineLeft: number;
    tabUnderlineWidth: number;
}

function Underline({ tabUnderlineLeft, tabUnderlineWidth }: IUnderline) {
    return (
        <div
            className="absolute bottom-0 block h-1 bg-zinc-200 transition-all duration-300" //
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        ></div>
    );
}

export default Underline;

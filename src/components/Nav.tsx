import { Link } from "react-router-dom";

const navArr = [
    { merchantName: "건대점", merchantLink: "/ku" },
    { merchantName: "건대2호점", merchantLink: "/ku2" },
    { merchantName: "강남점", merchantLink: "/gangnam" },
    { merchantName: "수원점", merchantLink: "/suwon" },
    { merchantName: "홍대점", merchantLink: "/hongdae" },
];

function Nav() {
    return (
        <div className="inline-block text-center whitespace-nowrap py-6 border-b border-zinc-500 w-full overflow-x-auto">
            {navArr.map((nav, index) => {
                return index === 0 ? (
                    <Link to={nav.merchantLink} key={index}>
                        <button
                            key={index}
                            className="p-1 sm:p-2 text-lg border border-zinc-500
                            bg-zinc-500 rounded-sm ml-2
                            text-zinc-100"
                        >
                            {nav.merchantName}
                        </button>
                    </Link>
                ) : (
                    <Link to={nav.merchantLink} key={index}>
                        <button
                            className="p-1 sm:p-2 text-lg border border-zinc-500
                            bg-zinc-800 rounded-sm ml-2
                            text-zinc-400"
                            key={index}
                        >
                            {nav.merchantName}
                        </button>
                    </Link>
                );
            })}
            {/*<Link className="" to='{nav.merchantLink}'>*/}
            {/*    <button*/}
            {/*        className="p-1 sm:p-2 text-lg border border-zinc-500*/}
            {/*                bg-zinc-800 rounded-sm ml-2*/}
            {/*                text-zinc-400">*/}
            {/*asdfasdf*/}
            {/*    </button>*/}
            {/*</Link>*/}
            {/*<Link className="" to='{nav.merchantLink}'>*/}
            {/*    <button*/}
            {/*        className="p-1 sm:p-2 text-lg border border-zinc-500*/}
            {/*                bg-zinc-800 rounded-sm ml-2*/}
            {/*                text-zinc-400">*/}
            {/*        asdfasdf*/}
            {/*    </button>*/}
            {/*</Link>*/}
            {/*<Link className="" to='{nav.merchantLink}'>*/}
            {/*    <button*/}
            {/*        className="p-1 sm:p-2 text-lg border border-zinc-500*/}
            {/*                bg-zinc-800 rounded-sm ml-2*/}
            {/*                text-zinc-400">*/}
            {/*        asdfasdf*/}
            {/*    </button>*/}
            {/*</Link>*/}
            {/*<Link className="" to='{nav.merchantLink}'>*/}
            {/*    <button*/}
            {/*        className="p-1 sm:p-2 text-lg border border-zinc-500*/}
            {/*                bg-zinc-800 rounded-sm ml-2*/}
            {/*                text-zinc-400">*/}
            {/*        asdfasdf*/}
            {/*    </button>*/}
            {/*</Link>*/}
            {/*<Link className="" to='{nav.merchantLink}'>*/}
            {/*    <button*/}
            {/*        className="p-1 sm:p-2 text-lg border border-zinc-500*/}
            {/*                bg-zinc-800 rounded-sm ml-2*/}
            {/*                text-zinc-400">*/}
            {/*        asdfasdf*/}
            {/*    </button>*/}
            {/*</Link>*/}
            {/*<Link className="" to='{nav.merchantLink}'>*/}
            {/*    <button*/}
            {/*        className="p-1 sm:p-2 text-lg border border-zinc-500*/}
            {/*                bg-zinc-800 rounded-sm ml-2*/}
            {/*                text-zinc-400">*/}
            {/*        asdfasdf*/}
            {/*    </button>*/}
            {/*</Link>*/}
        </div>
    );
}

export default Nav;

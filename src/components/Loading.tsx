import { TailSpin } from "react-loader-spinner";

function Loading() {
    return (
        <div className="w-full flex justify-center items-center h-[60vh]">
            <TailSpin height="60" width="60" color="#9C8871" ariaLabel="audio-loading" wrapperStyle={{}} wrapperClass="wrapper-class" visible={true} />;
        </div>
    );
}

export default Loading;

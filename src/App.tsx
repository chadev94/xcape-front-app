import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="sm:w-[414px] mx-auto">
            <Nav />
            <Outlet />
        </div>
    );
}

export default App;

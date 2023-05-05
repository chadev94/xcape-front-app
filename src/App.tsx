import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="sm:w-3/5 mx-auto">
            <Nav />
            <Outlet />
        </div>
    );
}

export default App;

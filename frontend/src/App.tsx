import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import SignUp from "./pages/signUp.tsx";
import Basic from "./layout/Basic.tsx";
import Authenticated from "./layout/Authenticate.tsx";
import HomePage from "./pages/HomePage.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";
import AdminNavbar from "./layout/AdminAuthenticate.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";

function App() {


    return (
        <>
            <Routes>
                <Route element={<Authenticated/>}>
                    <Route path="/" element={<HomePage/>}/>
                </Route>

                <Route element={<Basic/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Route>
                <Route path='/admin-paise' element={<AdminLoginPage/>}/>
                <Route element={<AdminNavbar/>}>
                    <Route path="/admin-paise/dashboard" element={<AdminDashboardPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PrivateLogin, PrivateRoutes } from "./pageRoute";

import { LoginPage } from "./components/login";
import { HomePage } from "./components/home"; 
import { ErrorPage } from "./components/error";    
import { SignUpPage } from "./components/signup";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<PrivateLogin />}>
                    <Route index element = {<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
                <Route element = {<PrivateRoutes/>}>
                    <Route path="/home" element = {<HomePage/>}/>
                </Route>
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}
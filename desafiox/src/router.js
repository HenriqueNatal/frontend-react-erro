import Login from "./pages/login";
import CRUD from "./pages/crud";
import Produtos from "./pages/produtos";
import Home from "./pages/home";

import Menu from "./components/menu";

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Router() {
    return (

        <BrowserRouter>

            <Menu/>
            
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/CRUD" element={<CRUD />} />
                <Route path="/produtos" element={<Produtos />} />
            </Routes>
        </BrowserRouter>

    );
}

export default Router;
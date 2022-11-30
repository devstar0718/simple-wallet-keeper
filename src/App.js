import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toast";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AddNetwork from "./pages/AddNetwork";
import Home from "./pages/Home";
import store from "./config/store";
import { SHOW_WALLET_LIST } from "./config/constant";

function App() {
    const [accordion, updateAccordion] = store.useState(SHOW_WALLET_LIST);

    return (
        <div
            className="App"
            onClick={() => {
                if (accordion) updateAccordion(() => false);
            }}
        >
            <ToastContainer delay={5000} position={"bottom-right"} />
            <Header />
            <Routes>
                <Route element={<Sidebar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/addNetwork" element={<AddNetwork />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

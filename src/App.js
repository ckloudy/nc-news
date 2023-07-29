import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import Nav from "./components/Nav";
import FilterArticles from "./components/FilterArticles";
import SingleFullArticle from "./components/SingleFullArticle";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import Sidebar from "./components/sideBar";

function App() {
    const [user, setUser] = useState({
        name: "Jess",
        username: "jessjelly",
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <div id="outer-container">
                    <div className="container mx-auto" id="page-wrap">
                        <Nav user={user} />
                        <Sidebar user={user} />
                    </div>
                </div>

                <div className=" w-full text-center my-8 font-sans">
                    <div className="]">
                        <p className="text-3xl md:text-5xl font-black text-white drop-shadow-sm bg-gradient-to-r from-cyan-500 to-blue-500 p-7">
                            Get all the latest and trending news
                        </p>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/articles/topics/:topic" element={<FilterArticles />} />
                    <Route
                        path="/articles/topics/:topic/article-:id"
                        element={<SingleFullArticle />}
                    />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;

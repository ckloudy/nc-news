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
        <div className="">
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <div id="outer-container">
                        <div className="container mx-auto" id="page-wrap">
                            <Nav user={user} />
                            <Sidebar user={user} />
                        </div>
                    </div>

                    <div className="relative inline-block w-full">
                        <img
                            src="/mainImage.jpg"
                            alt="main"
                            className="h-[200px] w-[100%] object-cover my-8 brightness-75"
                        />
                        <div className="absolute top-[30%] text-center px-5 align-center left-auto lg:top-[40%] lg:right-[5%] xl:right-[18%] md:right-[5%]">
                            <p className="text-3xl md:text-5xl font-black text-white drop-shadow-lg ">
                                "Knowledge Is The Life Of The Mind"
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
        </div>
    );
}

export default App;

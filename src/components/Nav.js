import { NavLink } from "react-router-dom";

const Nav = ({ user }) => {
    return (
        <div className="flex justify-between my-4 font-sans items-baseline text-xl md:text-sm">
            <div>
                <NavLink to="/">
                    <h1 className="text-l font-black pl-4 md:p-0">Paddington Post</h1>
                </NavLink>
            </div>

            <nav className="md:flex gap-3 hidden">
                <NavLink
                    to="/"
                    className="text-black aria-[current=page]:underline underline-offset-4">
                    All Articles
                </NavLink>
                <span>|</span>
                <NavLink
                    to="/articles/topics/coding"
                    className="text-black aria-[current=page]:underline underline-offset-4">
                    Coding Articles
                </NavLink>
                <span>|</span>
                <NavLink
                    to="/articles/topics/cooking"
                    className="text-black aria-[current=page]:underline underline-offset-4">
                    Cooking Articles
                </NavLink>
                <span>|</span>
                <NavLink
                    to="/articles/topics/football"
                    className="text-black aria-[current=page]:underline underline-offset-4">
                    Football Articles
                </NavLink>
            </nav>
            <div className="font-bold text-black invisible md:visible">Hello 👋🏻, {user.name}</div>
        </div>
    );
};

export default Nav;

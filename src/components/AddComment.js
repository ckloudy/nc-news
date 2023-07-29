import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";
import { sendArticleIdComment } from "../utils/articlesApi";
import { useState } from "react";

const AddComment = ({ id, setNewComment }) => {
    const { user } = useContext(UserContext);

    const [done, setDone] = useState("Add comment");
    const [disabled, setDisabled] = useState(false);
    const [sent, setSent] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("primary");

    const handleSubmit = () => {
        if (message === "") {
            setColor("error");
            setDone("Type a comment");
            setTimeout(() => {
                setColor("primary");
                setDone("Add a comment");
            }, 1000);
        } else {
            setDisabled(true);
            sendArticleIdComment(id, user.username, message).then(() => {
                setDisabled(false);
                setDone(<Done />);
                setSent("posted");
                setColor("success");
                setTimeout(() => {
                    setSent("");
                    setDone("Add Comment");
                    setColor("primary");
                }, 1500);
                setMessage("");
                setNewComment(true);
            });
        }
    };

    return (
        <div className="inline-block gap-6 justify-between mb-7 mt-8 md:flex w-full items-center">
            <form className="w-full ">
                <input
                    className="w-full h-10 border-1 rounded-md p-6 ring-0 shadow-md mb-4 md:mb-0"
                    id="comment"
                    placeholder="What are your thoughts?"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
            <button
                className="text-sm bg-blue-500 px-4 py-2 rounded-md shadow-md text-white hover:font-bold"
                variant="contained"
                onClick={handleSubmit}
                disabled={disabled}
                color={color}>
                {done}
                {sent}
            </button>
        </div>
    );
};

export default AddComment;

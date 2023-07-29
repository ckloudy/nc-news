import DeleteComment from "./DeleteComment";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const SingleComment = ({ comment, setDeleteComment, setAllComments }) => {
    const dateOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    const date = comment.created_at;
    const displayDate = new Date(date);
    const dateString = displayDate.toLocaleDateString("en-GB", dateOptions);
    const hours = displayDate.getHours();
    const mins = displayDate.getMinutes();
    const { user } = useContext(UserContext);

    const ampm = hours < 12 ? "am" : "pm";
    const lessThanTenInHours = hours < 10 ? 0 : "";
    const lessThanTenInMinutes = mins < 10 ? 0 : "";

    return (
        <li className="bg-white my-3 rounded-md flex justify-between items-center">
            <div className="p-4">
                <p className="text-sm mb-5">
                    <span className="font-semibold">{comment.author}</span> | {dateString} @ {""}
                    {lessThanTenInHours}
                    {hours}:{lessThanTenInMinutes}
                    {mins}
                    {ampm}
                </p>
                <p>{comment.body}</p>
            </div>

            {user.username === comment.author ? (
                <DeleteComment
                    id={comment.comment_id}
                    setDeleteComment={setDeleteComment}
                    setAllComments={setAllComments}
                />
            ) : null}
        </li>
    );
};

export default SingleComment;

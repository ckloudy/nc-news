import DeleteComment from "./DeleteComment";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import formatDate from "../utils/formatDate";

const SingleComment = ({ comment, setDeleteComment, setAllComments }) => {
    const date = comment.created_at;
    const { user } = useContext(UserContext);
    const postedOn = formatDate(date);

    return (
        <li className="bg-white my-3 rounded-md flex justify-between items-center">
            <div className="p-4">
                <p className="text-sm mb-5">
                    <span className="font-semibold">{comment.author}</span> | {postedOn}
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

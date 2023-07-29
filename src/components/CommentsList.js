import { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { getArticleIdComments } from "../utils/articlesApi";

const CommentsList = ({ id, newComment, setNewComment }) => {
    const [allComments, setAllComments] = useState([]);
    const [deleteComment, setDeleteComment] = useState(false);

    useEffect(() => {
        getArticleIdComments(id).then((commentsFromApi) => {
            setAllComments(commentsFromApi.comments);
            setNewComment(false);
        });
    }, [id, newComment, setNewComment, deleteComment]);

    return (
        <div className="mb-9">
            <ul>
                {allComments.map((comment) => {
                    return (
                        <SingleComment
                            id={id}
                            comment={comment}
                            key={comment.comment_id}
                            author={comment.auhtor}
                            setAllComments={setAllComments}
                            setDeleteComment={setDeleteComment}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default CommentsList;

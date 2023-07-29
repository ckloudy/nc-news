import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { deleteCommentById } from "../utils/articlesApi";

const DeleteComment = ({ id, setAllComments }) => {
    const handleDelete = () => {
        deleteCommentById(id);
        setAllComments((curr) => {
            return curr.filter((comment) => {
                return comment.comment_id !== id;
            });
        });
    };

    return (
        <div className="mr-6">
            <IconButton onClick={handleDelete}>
                <Delete color="success" />
            </IconButton>
        </div>
    );
};

export default DeleteComment;

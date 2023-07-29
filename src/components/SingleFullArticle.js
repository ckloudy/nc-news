import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFullArticle } from "../utils/articlesApi";
import { Container, IconButton } from "@mui/material";
import { ThumbUpRounded, ThumbDownRounded } from "@mui/icons-material";
import { updateArticle } from "../utils/articlesApi";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import Error from "./Error";

const SingleFullArticle = () => {
    const [fullArticle, setFullArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [upVotesChange, setUpVotesChange] = useState(0);
    const [downVotesChange, setDownVotesChange] = useState(0);
    const [upDisabled, setUpDisabled] = useState(false);
    const [downDisabled, setDownDisabled] = useState(false);
    const [newComment, setNewComment] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const handleUpVote = (inc) => {
        setUpVotesChange((curr) => curr + inc);
        setUpDisabled(true);
        setDownDisabled(false);
        updateArticle(id, inc);
    };

    const handleDownVote = (inc) => {
        setDownVotesChange((curr) => curr + inc);
        setDownDisabled(true);
        setUpDisabled(false);
        updateArticle(id, inc);
    };

    useEffect(() => {
        getFullArticle(id)
            .then((articleFromApi) => {
                setFullArticle(articleFromApi.article);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setError(err.response.data.msg);
                    setIsLoading(false);
                } else {
                    setError("Something has gone wrong");
                }
            });
    }, [id, isLoading]);

    if (isLoading) {
        return (
            <div className="text-center mt-10">
                <div className="dots-bars-6 flex mx-auto"></div>
                <p className="font-Lato mt-10">
                    If you're reading this then it's because the server is spinning up due to being
                    on a free plan 😩
                </p>
            </div>
        );
    } else {
        if (error) {
            setIsLoading(false);
            return <Error error={error} />;
        }

        return (
            <Container>
                <div className="mb-4 border-b border-gray-400">
                    <span
                        className={`text-[0.7rem] text-white py-1 px-3 rounded-full font-semibold inline-block mb-3 ${
                            fullArticle.topic === "cooking"
                                ? "bg-yellow-400"
                                : fullArticle.topic === "coding"
                                ? "bg-blue-400"
                                : fullArticle.topic === "football"
                                ? "bg-green-400"
                                : "bg-white"
                        }`}>
                        {fullArticle.topic}
                    </span>
                    <h2 className="font-sans text-3xl font-bold mb-3">{fullArticle.title}</h2>
                    <p>{fullArticle.body}</p>
                    <div className="flex items-center justify-between mt-5 text-sm font-semibold">
                        <p>Written by - {fullArticle.author}</p>
                        <div className="flex items-center">
                            {fullArticle.votes + upVotesChange + downVotesChange} Votes
                            <IconButton onClick={() => handleUpVote(+1)} disabled={upDisabled}>
                                <ThumbUpRounded className="text-green-500" />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => handleDownVote(-1)}
                                disabled={downDisabled}>
                                <ThumbDownRounded />
                            </IconButton>
                        </div>
                    </div>
                </div>

                <AddComment id={id} setNewComment={setNewComment} />
                <p>{fullArticle.comment_count} Comments</p>
                <div className="mt-1">
                    <CommentsList
                        fullArticle={fullArticle}
                        id={id}
                        newComment={newComment}
                        setNewComment={setNewComment}
                    />
                </div>
            </Container>
        );
    }
};

export default SingleFullArticle;

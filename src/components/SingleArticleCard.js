import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { FavoriteRounded, QuestionAnswer } from "@mui/icons-material";
import { motion } from "framer-motion";
import formatDate from "../utils/formatDate";

const SingleArticleCard = ({ article }) => {
    const date = article.created_at;
    const lowerCaseTitle = article.title.toLowerCase();
    const newTitle = lowerCaseTitle.charAt(0).toUpperCase() + lowerCaseTitle.slice(1);

    const postedOn = formatDate(date);

    //Animation variants for cards
    const cardVariants = {
        offscreen: {
            y: 300,
        },
        onscreen: {
            y: 20,

            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1,
            },
        },
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}>
            <motion.div variants={cardVariants}>
                <Card>
                    <CardContent>
                        <div className="flex justify-between items-center px-5 border-b-2 pb-3">
                            <p className="text-[12px] inline-block">{postedOn}</p>
                            <span
                                className={`text-[0.7rem] text-white py-1 px-3 rounded-full font-semibold ${
                                    article.topic === "cooking"
                                        ? "bg-yellow-400"
                                        : article.topic === "coding"
                                        ? "bg-blue-400"
                                        : article.topic === "football"
                                        ? "bg-green-400"
                                        : "bg-white"
                                }`}>
                                {article.topic}
                            </span>
                        </div>
                        <Link
                            to={`/articles/topics/${article.topic}/article-${article.article_id}`}
                            className="hover:text-blue-700 ">
                            <div className="h-48 flex font-sans items-center text-left justify-left px-5">
                                <p className="text-xl font-bold">{newTitle}</p>
                            </div>
                        </Link>

                        <div className="flex justify-between items-center px-5 bg-gray-800 text-white rounded-sm">
                            <div>
                                <p className="text-[12px] text-gray-300">
                                    Written by -{" "}
                                    <span className="font-semibold ">{article.author}</span>
                                </p>
                            </div>
                            <div className="flex gap-3 p-2">
                                <div className="flex gap-1 items-center">
                                    <p className="text-[15px]">{article.comment_count}</p>
                                    <QuestionAnswer className="text-blue-300" />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <p className="text-[15px]">{article.votes}</p>
                                    <FavoriteRounded className="text-red-300 text-sm" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default SingleArticleCard;

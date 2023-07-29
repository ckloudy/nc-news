import { useState, useEffect } from "react";
import { getArticles } from "../utils/articlesApi";
import SingleArticleCard from "./SingleArticleCard";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { capitalizeFirstLetter } from "../utils/Capitalize";

const ArticleList = ({ topic }) => {
    const [articles, setArticles] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [topicCap, setTopicCap] = useState("");
    const [sort, setSort] = useState("created_at");
    const [order, setOrder] = useState("DESC");

    useEffect(() => {
        getArticles(topic, sort, order)
            .then((articlesFromApi) => {
                setArticles(articlesFromApi.articles);
                setIsLoading(false);
                const cap = capitalizeFirstLetter(topic);
                setTopicCap(cap);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [topic, isLoading, sort, order]);

    const handleChange = (e) => {
        setSort(e.target.value);
    };

    const handleOrder = (e) => {
        setOrder(e.target.value);
    };

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
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-12 mx-2 md:mx-10">
                <div className="justify-between items-center inline-block md:flex">
                    <h2 className="mx-6 mb-5 md:mb-8 text-4xl font-sans font-semibold items-center">
                        {topicCap ? `${topicCap} Articles` : "All Articles"}
                    </h2>
                    <Box className="flex gap-2 mr-10 w-80 mx-6 mb-5 md:mb-8">
                        <FormControl fullWidth size="small">
                            <InputLabel color="success" id="select-label">
                                Sort By
                            </InputLabel>
                            <Select
                                color="success"
                                labelId="select-label-sort"
                                id="simple-select"
                                label="Sort By"
                                value={sort}
                                onChange={handleChange}>
                                <MenuItem value={"created_at"}>Most recent</MenuItem>
                                <MenuItem value={"title"}>Title</MenuItem>
                                <MenuItem value={"author"}>Author</MenuItem>
                                <MenuItem value={"votes"}>Votes</MenuItem>
                                <MenuItem value={"comment_count"}>Comments</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel color="success" id="select-label">
                                Order
                            </InputLabel>
                            <Select
                                color="success"
                                labelId="select-label-order"
                                id="simple-select"
                                label="Order"
                                value={order}
                                onChange={handleOrder}>
                                <MenuItem value={"ASC"}>Asc</MenuItem>
                                <MenuItem value={"DESC"}>Desc</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 px-5">
                    {articles.map((article, index) => {
                        return (
                            <SingleArticleCard
                                article={article}
                                index={index}
                                key={article.article_id}
                            />
                        );
                    })}
                </div>
            </motion.div>
        );
    }
};

export default ArticleList;

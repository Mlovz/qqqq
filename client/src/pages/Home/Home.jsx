import React, { useEffect } from "react";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";

import { ArticleCard, Heading } from "components";
import { getArticles } from "redux/actions/articleAction";

const Home = () => {
  const { articles } = useSelector((state) => state.article);

  return (
    <div className="home">
      <Heading>Необычный блог</Heading>

      <div className="home_block">
        {articles.length > 0 ? (
          articles?.map((article, index) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              content={article.content}
              createdAt={article.createdAt}
              id={article._id}
              // scrollTop не нужен
            />
          ))
        ) : (
          <Heading>Постов нет</Heading>
        )}
      </div>
    </div>
  );
};

export default Home;

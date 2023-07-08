import React from "react";
import "./detail-post.scss";

import { ArticleCard, DetailCard } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getArticle } from "redux/actions/articleAction";

const DetailPost = () => {
  const dispatch = useDispatch();
  const { blog, articles } = useSelector((state) => state.article);
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(getArticle(id));
    }
  }, [id]);

  return (
    <div className="detail-post">
      {blog && <DetailCard post={blog} />}

      <div className="detail-post_similar">
        {articles.slice(0, 2).map((article) => (
          <ArticleCard
            key={article._id}
            title={article.title}
            content={article.content}
            createdAt={article.createdAt}
            id={article._id}
            scrollTop
          />
        ))}
      </div>
    </div>
  );
};

export default DetailPost;

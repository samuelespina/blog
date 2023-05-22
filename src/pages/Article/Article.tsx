import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { interfaceArticles, queryArticles } from "../../utils";

const Article = () => {
  const { id } = useParams();

  const [queryResultArticlesDatas, setQueryResultArticlesDatas] =
    useState<interfaceArticles | null>(null);
  useEffect(() => {
    axios({
      method: "post",
      url: "http://blog-data.local/graphql",
      data: {
        query: queryArticles,
      },
    }).then((res) => {
      setQueryResultArticlesDatas(res.data);
    });
  }, []);

  const renderArticlePage = () => {
    return (
      <section className="article">
        <article>
          <div className="title">
            <h1>
              {queryResultArticlesDatas.data.posts.nodes[parseInt(id)].title}
            </h1>
          </div>
        </article>
        <article>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html:
                queryResultArticlesDatas.data.posts.nodes[parseInt(id)].content,
            }}
          ></div>
        </article>
      </section>
    );
  };
  return (
    <div className="article">
      {queryResultArticlesDatas ? renderArticlePage() : ""};
    </div>
  );
};

export default Article;

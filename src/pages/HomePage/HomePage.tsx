import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { queryArticles, interfaceArticles } from "../../utils";

const HomePage = () => {
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
      console.log(res);
      setQueryResultArticlesDatas(res.data);
    });
  }, []);

  const renderArticles = () => {
    const resultArticles = [];
    for (
      let i = queryResultArticlesDatas.data.posts.nodes.length - 1;
      i > -1;
      i--
    ) {
      resultArticles.push(
        <section className="articles">
          <article>
            <div className="title">
              <h1>{queryResultArticlesDatas.data.posts.nodes[i].title}</h1>
            </div>
          </article>
          <article>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: queryResultArticlesDatas.data.posts.nodes[i].content,
              }}
            ></div>
          </article>
        </section>
      );
    }
    return resultArticles;
  };

  return (
    <div className="homepage">
      {queryResultArticlesDatas ? renderArticles() : ""}
    </div>
  );
};

export default HomePage;

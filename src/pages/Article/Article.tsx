import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import {
  interfaceArticles,
  interfaceCategoryArticles,
  queryArticles,
} from "../../utils";
import { Spinner } from "../../components";
import AOS from "aos";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();

  const [
    queryResultArticlesDatas,
    setQueryResultArticlesDatas,
  ] = useState<interfaceArticles | null>(null);
  const [related, setRelated] = useState<interfaceCategoryArticles | null>(
    null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    axios({
      method: "post",
      url: "https://dev-blog-wp.pantheonsite.io/graphql",
      data: {
        query: `query{
          post(id: "${id}") {
            categories{
              nodes{
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            title
            content
          }
        }`,
      },
    }).then((res) => {
      setQueryResultArticlesDatas(res.data);
    });
  }, [pathname]);

  useEffect(() => {
    if (queryResultArticlesDatas) {
      axios({
        method: "post",
        url: "https://dev-blog-wp.pantheonsite.io/graphql",
        data: {
          query: `query{
              posts(where: {categoryName:"${queryResultArticlesDatas.data.post.categories.nodes[0].name}"}) {
                nodes{
                  featuredImage{
                    node{
                      sourceUrl
                    }
                  }
                }
                edges {
                  node {
                    title
                    content
                    id
                  }
                }
              }
            }`,
        },
      }).then((res) => {
        setRelated(res.data);
      });
    }
  }, [pathname, queryResultArticlesDatas]);

  const renderArticlePage = () => {
    return (
      <section className="article">
        <article>
          <div className="article-img-wrapper">
            <img
              src={
                queryResultArticlesDatas.data.post.featuredImage.node.sourceUrl
              }
              alt=""
              className="article-img"
            />
          </div>
        </article>
        <article className="article-description">
          <h1 className="title">{queryResultArticlesDatas.data.post.title}</h1>

          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: queryResultArticlesDatas.data.post.content,
            }}
          ></div>
        </article>
      </section>
    );
  };

  const renderRelated = () => {
    const result = [];

    for (let i = related.data.posts.edges.length - 1; i > -1; i--) {
      if (related.data.posts.edges[i].node.id != id) {
        result.push(
          <section
            onClick={() => {
              navigate("/article/" + related.data.posts.edges[i].node.id);
            }}
            className="article"
          >
            <article>
              <div className="article-img-wrapper">
                <img
                  src={related.data.posts.nodes[i].featuredImage.node.sourceUrl}
                  alt=""
                  className="article-img"
                />
              </div>
            </article>
            <article className="article-description">
              <h1 className="title">
                {related.data.posts.edges[0].node.title}
              </h1>

              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: related.data.posts.edges[i].node.content,
                }}
              ></div>
            </article>
          </section>
        );
      }
    }
    return result;
  };
  return (
    <>
      <section className="article-page-wrapper">
        <div className="ticket">
          <p> Buy ticket</p>
        </div>
        <article className="article-clicked">
          {queryResultArticlesDatas ? renderArticlePage() : <Spinner />}
        </article>
        <section className="related-wrapper">
          {" "}
          <h2 className="related-title">
            Risultati correlati a :
            <i>
              {" "}
              {queryResultArticlesDatas
                ? queryResultArticlesDatas.data.post.categories.nodes[0].name
                : ""}
            </i>
          </h2>
          <div className="related-article-wrapper">
            <article className="related">
              {related ? renderRelated() : ""}
            </article>
          </div>
        </section>
      </section>
    </>
  );
};

export default Article;

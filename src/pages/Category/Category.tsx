import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  interfaceCategoryArticles,
  interfaceQueryImg,
  queryImg,
} from "../../utils";
import { Spinner } from "../../components";

const Category = () => {
  const [
    categoryArticles,
    setCategoryArticles,
  ] = useState<interfaceCategoryArticles | null>(null);
  const { id } = useParams();
  const pathname = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "post",
      url: "https://dev-blog-wp.pantheonsite.io/graphql",
      data: {
        query: `query{
            posts(where: {categoryName:"${id}"}) {
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
      setCategoryArticles(res.data);
    });
  }, [pathname]);

  const renderCategoryArticles = () => {
    const result = [];

    for (let i = categoryArticles.data.posts.edges.length - 1; i > -1; i--) {
      result.push(
        <section
          onClick={() => {
            navigate(
              "/article/" + categoryArticles.data.posts.edges[i].node.id
            );
          }}
          className="article"
        >
          <article>
            <div className="article-img-wrapper">
              <Spinner />
              <img
                className="article-img"
                src={
                  categoryArticles.data.posts.nodes[i].featuredImage.node
                    .sourceUrl
                }
                alt=""
              />
            </div>
          </article>
          <article className="article-description">
            <h1 className="title">
              {JSON.stringify(categoryArticles.data.posts.edges[i].node.title)}
            </h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: categoryArticles.data.posts.edges[i].node.content,
              }}
            ></div>
          </article>
        </section>
      );
    }

    return result;
  };

  return (
    <div className="article-page-container-category">
      {categoryArticles ? (
        <div className="article-wrapper">{renderCategoryArticles()}</div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Category;

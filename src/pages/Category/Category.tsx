import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  interfaceCategoryArticles,
  interfaceQueryImg,
  queryImg,
} from "../../utils";

const Category = () => {
  const [categoryArticles, setCategoryArticles] =
    useState<interfaceCategoryArticles | null>(null);
  const { id } = useParams();
  const pathname = useLocation();

  useEffect(() => {
    axios({
      method: "post",
      url: "http://blog-data.local/graphql",
      data: {
        query: `query{
            posts(where: {search:"${id}"}) {
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
        <section className="article">
          <article>
            <img
              src={
                categoryArticles.data.posts.nodes[i].featuredImage.node
                  .sourceUrl
              }
              alt=""
            />
          </article>
          <article>
            <div className="title">
              <h1>
                {JSON.stringify(
                  categoryArticles.data.posts.edges[i].node.title
                )}
              </h1>
            </div>
          </article>
          <article>
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
    <div className="category-wrapper">
      <p className="category">
        {categoryArticles ? renderCategoryArticles() : ""}
      </p>
    </div>
  );
};

export default Category;

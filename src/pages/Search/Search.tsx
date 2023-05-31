import axios from "axios";
import React, { useEffect, useState } from "react";
import { interfaceSearch } from "../../utils";
import { useLocation, useParams } from "react-router";

const Search = () => {
  const [searchResult, setSearchResult] = useState<interfaceSearch | null>(
    null
  );
  const { id } = useParams();

  const pathname = useLocation();

  useEffect(() => {
    axios({
      method: "post",
      url: "http://blog-data.local/graphql",
      data: {
        query: `query{
          posts(where: {search:"${id}"}) {
            nodes {
              featuredImage {
                node {
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
      setSearchResult(res.data);
    });
  }, [pathname]);

  const renderSearch = () => {
    const result = [];

    for (let i = searchResult.data.posts.edges.length - 1; i > -1; i--) {
      result.push(
        <section className="article">
          <div className="article-img-wrapper">
            <img
              className="article-img"
              src={
                searchResult.data.posts.nodes[i].featuredImage.node.sourceUrl
              }
              alt=""
            />
          </div>
          <article className="article-description">
            <h1 className="title">
              {JSON.stringify(searchResult.data.posts.edges[i].node.title)}
            </h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: searchResult.data.posts.edges[i].node.content,
              }}
            ></div>
          </article>
        </section>
      );
    }
    return result;
  };

  return (
    <div className="search-wrapper">{searchResult ? renderSearch() : ""}</div>
  );
};

export default Search;

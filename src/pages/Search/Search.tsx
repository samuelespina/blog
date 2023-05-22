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
          posts(first: 10, after: null, where: {search:"${id}"}) {
            edges {
              node {
                id
                title
                excerpt
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
          <article>
            <div className="title">
              <h1>
                {JSON.stringify(searchResult.data.posts.edges[i].node.title)}
              </h1>
            </div>
          </article>
          <article>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: searchResult.data.posts.edges[i].node.excerpt,
              }}
            ></div>
          </article>
        </section>
      );
    }
    return result;
  };

  return (
    <div className="search">
      {searchResult ? renderSearch() : ""}
      <p>{id}</p>
    </div>
  );
};

export default Search;

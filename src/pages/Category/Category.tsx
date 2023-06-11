import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  interfaceCategoryArticles,
  interfaceQueryImg,
  queryImg,
} from "../../utils";
import { Spinner } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    console.log(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const [
    categoryArticles,
    setCategoryArticles,
  ] = useState<interfaceCategoryArticles | null>(null);
  const { id } = useParams();
  const pathname = useLocation();
  const navigate = useNavigate();
  const [startPointPagination, setStartPointPagination] = useState<number>(1);
  const [endPointPagination, setEndPointPagination] = useState<number>(4);
  const forwardRef = useRef<HTMLInputElement | null>(null);
  const backwardRef = useRef<HTMLInputElement | null>(null);
  const categorySlice = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

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
    setStartPointPagination(1);
    setEndPointPagination(4);
  }, [pathname]);

  useEffect(() => {
    if (backwardRef.current) {
      startPointPagination <= 1
        ? backwardRef.current.classList.add("no-content")
        : backwardRef.current.classList.remove("no-content");
    }
    if (forwardRef.current) {
      categoryArticles
        ? endPointPagination >= categoryArticles.data.posts.edges.length + 1
          ? forwardRef.current.classList.add("no-content")
          : forwardRef.current.classList.remove("no-content")
        : forwardRef.current.classList.remove("no-content");
    }
  }, [
    startPointPagination,
    endPointPagination,
    backwardRef.current,
    forwardRef.current,
    categoryArticles,
  ]);

  const backward = () => {
    if (startPointPagination > 1) {
      setStartPointPagination(startPointPagination - 1);
      setEndPointPagination(endPointPagination - 1);
    }
  };

  const forward = () => {
    if (categoryArticles.data.posts.edges.length) {
      if (endPointPagination < categoryArticles.data.posts.edges.length + 1) {
        setStartPointPagination(startPointPagination + 1);
        setEndPointPagination(endPointPagination + 1);
      }
    }
  };

  const renderCategoryArticles = () => {
    const result = [];

    for (
      let i = categoryArticles.data.posts.edges.length - startPointPagination;
      i > categoryArticles.data.posts.edges.length - endPointPagination;
      i--
    ) {
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
            <h2 className="title">
              {JSON.stringify(categoryArticles.data.posts.edges[i].node.title)}
            </h2>
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
        <>
          <div className="article-wrapper" ref={categorySlice}>
            {renderCategoryArticles()}
          </div>
          <button
            className="backward"
            ref={backwardRef}
            onClick={() => {
              backward();
              screenWidth < 769 &&
                setTimeout(() => {
                  window.scrollTo(0, 100000);
                }, 100);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="forward"
            ref={forwardRef}
            onClick={() => {
              forward();
              console.log("dio");

              screenWidth < 769 &&
                setTimeout(() => {
                  window.scrollTo(0, 100000);
                }, 100);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} flip={"horizontal"} />
          </button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Category;

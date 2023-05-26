import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Marquee from "react-fast-marquee";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  queryArticles,
  queryCategories,
  interfaceArticles,
  interfaceCategoriesNames,
  queryImg,
  interfaceQueryImg,
} from "../../utils";

const HomePage = () => {
  const [
    queryResultArticlesDatas,
    setQueryResultArticlesDatas,
  ] = useState<interfaceArticles | null>(null);
  const [
    queryResultImg,
    setQueryResultImg,
  ] = useState<interfaceQueryImg | null>(null);
  const navigate = useNavigate();

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

    axios({
      method: "post",
      url: "http://blog-data.local/graphql",
      data: {
        query: queryImg,
      },
    }).then((res) => {
      setQueryResultImg(res.data);
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
        <section
          onClick={() => {
            navigate("/article/" + i);
          }}
          className="article"
        >
          <article>
            <img
              src={
                queryResultImg.data.posts.nodes[i].featuredImage.node.sourceUrl
              }
              alt=""
            />
          </article>
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
      <div className="homepage-part-one">
        <div className="page-title">
          <p>Chi siamo?</p>
        </div>
        <h1>Travelly</h1>
        <p>Dove vuoi, quando vuoi</p>
        <Carousel>
          <div>
            <img src="" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
      <div className="homepage-part-two">
        <div className="page-title">
          <p>Vivere in viaggio</p>
        </div>

        <section className="description-homepage-two-wrapper">
          <div className="img-hp2-wrapper">
            <img className="vivere-viaggiando-img" alt="" />
          </div>
          <div className="description-homepage-two">
            {" "}
            <h1 className="description-title">
              Guadagnare con un blog di viaggi
            </h1>
            <p>
              Ami viaggiare più di ogni altra cosa ma soldi e tempo sono gli
              ostacoli contro cui combatti ogni giorno.{" "}
            </p>
            <p>
              Scrivere di viaggi ma guadagnare ti sembra un sogno troppo bello
              per essere vero.
            </p>
            <p>
              Non hai tempo per le tue passioni e per ciò che ami e questo è
              fonte di frustrazione.
            </p>
            <p>
              È esattamente per questo motivo che abbiamo creato la Travel
              Blogger School.
            </p>
          </div>
        </section>

        <section className="description-homepage-two-wrapper">
          <div className="img-hp2-wrapper-two">
            <img
              className="vivere-viaggiando-img-two"
              src="https://www.miprendoemiportovia.it/wp-content/uploads/2020/09/travel-blogger-school.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage-two">
            <h1 className="description-title"> Travel blogger school</h1>
            <p>
              Il primo percorso step by step che ti insegnerà come vivere
              viaggiando, diventare un travel blogger di successo e guadagnare
              con un blog di viaggi. In una frase: ti mostrerà come vivere la
              vita dei tuoi sogni. La Travel Blogger School è un (per)corso a
              pagamento, strutturato in 4 step che comprendono più di 50 lezioni
              video, 4 bonus, materiali di lavoro ed esercizi nei quali ti
              sveliamo come siamo riusciti a creare un brand online di successo
              grazie al nostro blog di viaggi.
            </p>
          </div>
        </section>
      </div>
      <div className="homepage-part-three">
        <div className="page-title">
          <p>Viaggi più popolari</p>
        </div>
        {queryResultArticlesDatas && queryResultImg ? renderArticles() : ""}
      </div>
    </div>
  );
};

export default HomePage;

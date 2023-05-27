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
  const iframe = useRef<HTMLInputElement | null>(null);

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

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-one">
            <img
              className="img-one"
              src="./images/DIVENTA-UN-TRAVEL-BLOGGER-1920X300-WEB.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
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

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/travel-blogger-school.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title"> Travel blogger school</h1>
            <p>
              Il primo percorso step by step che ti insegnerà come vivere
              viaggiando, diventare un travel blogger di successo e guadagnare
              con un blog di viaggi.
            </p>
            <p>
              {" "}
              In una frase: ti mostrerà come vivere la vita dei tuoi sogni.
            </p>
            <p>
              {" "}
              La Travel Blogger School è un (per)corso a pagamento, strutturato
              in 4 step che comprendono più di 50 lezioni video, 4 bonus,
              materiali di lavoro ed esercizi nei quali ti sveliamo come siamo
              riusciti a creare un brand online di successo grazie al nostro
              blog di viaggi.
            </p>
          </div>
        </section>
        <section className="description-homepage-wrapper">
          <iframe
            className="iframe"
            width="400"
            height="250"
            src="https://www.youtube.com/embed/pnGXNlO_2tU"
            title="COME DIVENTARE TRAVEL BLOGGER: la nostra storia (con sorpresa!)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>

          <div className="description-homepage">
            <h1 className="description-title"> Vivere Viaggiando</h1>
            <p>
              È un mini-corso, completamente gratuito, per muovere i primi passi
              nel mondo del travel blogging.
            </p>
            <p>
              Migliaia di persone sognano di vivere viaggiando, secondo le
              proprie condizioni e i propri termini.
            </p>
            <p>
              Sognano di lasciare un lavoro che non li rappresenta e di vivere
              senza orari di ufficio imposti da altri.
            </p>
            <p>
              Sei un viaggiatore e per questo sei abituato ad essere uno che
              agisce, non solamente un sognatore.
            </p>
            <p>
              Sai che i sogni dal cassetto vanno tirati fuori perché altrimenti
              fanno la muffa.
            </p>
            <p>
              In questo mini-corso scoprirai i passi fondamentali per creare un
              blog di viaggi e gettare le basi per vivere di questo.
            </p>
            <p>
              Fai il primo passo, iscriviti al mini corso gratuito e insegui il
              tuo sogno.
            </p>
          </div>
        </section>
      </div>
      <div className="homepage-part-three">
        <div className="page-title">
          <p>Viaggi più popolari</p>
        </div>
        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/quando-andare-zanzibar-300x169.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title">Quando andiamo a Zanzibar </h1>
            <p>Africa</p>
            <p> 26 gennaio 2023</p>
          </div>
        </section>

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/key-west-immagine-copertina-2-300x169.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title">
              Guida di Key West Florida: dove gli USA diventano Caraibi!
            </h1>
            <p>Americhe </p>
            <p>10 gennaio 2022</p>
          </div>
        </section>

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/viaggiare-sicuri-indonesia-300x169.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title">
              Indonesia: come viaggiare sicuri
            </h1>
            <p>Asia </p>
            <p>20 Gennaio 2023 </p>
          </div>
        </section>

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/On-the-road-in-Europa-Copertina-300x169.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title">
              3 viaggi da fare on the road in Europa
            </h1>
            <p>Europa</p>
            <p>30 Marzo 2023</p>
          </div>
        </section>

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/Val-dEga-Copertina-300x169.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title">
              Weekend in Val d’Ega: vacanza in montagna perfetta anche senza
              sciare!
            </h1>
            <p>Italia</p>
            <p>24 Febbraio 2023</p>
          </div>
        </section>

        <section className="description-homepage-wrapper">
          <div className="img-wrapper-two">
            <img
              className="img-two"
              src="./images/copertina-1-300x200.jpg"
              alt=""
            />
          </div>
          <div className="description-homepage">
            <h1 className="description-title">
              Viaggio in Australia: 3 hotel di lusso da Perth alla Clare Valley
            </h1>
            <p>Oceania</p>
            <p>3 Dicembre 2019</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

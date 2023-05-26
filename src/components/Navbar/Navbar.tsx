import React, { useState, useEffect, useRef } from "react";
import { interfaceCategoriesNames, queryCategories } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAfrica,
  faEarthAmericas,
  faEarthAsia,
  faEarthEurope,
  faEarthOceania,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../ToolTip";

const Navbar = () => {
  const [
    queryResultCategories,
    setQueryResultCategories,
  ] = useState<interfaceCategoriesNames | null>(null);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const icons = [
    faEarthAfrica,
    faEarthAmericas,
    faEarthAsia,
    faEarthEurope,
    faEarthOceania,
  ];

  const switchInput = useRef<HTMLInputElement>(null);
  const iconAnimation = useRef<HTMLInputElement>(null);
  const iconAnimation2 = useRef<HTMLInputElement>(null);
  const iconAnimation3 = useRef<HTMLInputElement>(null);
  const iconAnimation4 = useRef<HTMLInputElement>(null);
  const iconAnimation5 = useRef<HTMLInputElement>(null);
  const iconAnimation6 = useRef<HTMLInputElement>(null);
  const iconsRef = [
    iconAnimation2,
    iconAnimation3,
    iconAnimation4,
    iconAnimation5,
    iconAnimation6,
  ];
  const [switchIconAnimation, setSwitchIconAnimation] = useState<any>(null);
  const toolTipText: string[] = [
    "Africa",
    "Americhe",
    "Asia",
    "Europa",
    "Oceania",
  ];

  const [isOpenOne, setIsOpenOne] = useState<boolean>(false);
  const [isOpenTwo, setIsOpenTwo] = useState<boolean>(false);
  const [isOpenThree, setIsOpenThree] = useState<boolean>(false);
  const [isOpenFour, setIsOpenFour] = useState<boolean>(false);
  const [isOpenFive, setIsOpenFive] = useState<boolean>(false);
  const [isOpenSix, setIsOpenSix] = useState<boolean>(false);
  const [isOpenLogo, setIsOpenLogo] = useState<boolean>(false);

  const isOpenSetArray = [
    setIsOpenTwo,
    setIsOpenThree,
    setIsOpenFour,
    setIsOpenFive,
    setIsOpenSix,
  ];
  const isOpenArray = [
    isOpenTwo,
    isOpenThree,
    isOpenFour,
    isOpenFive,
    isOpenSix,
  ];

  useEffect(() => {
    axios({
      method: "post",
      url: "http://blog-data.local/graphql",
      data: {
        query: queryCategories,
      },
    }).then((res) => {
      setQueryResultCategories(res.data);
    });
  }, []);

  const renderCategories = () => {
    const resultCategories = [];

    for (
      let i = 0;
      i < queryResultCategories.data.categories.nodes.length;
      i++
    ) {
      resultCategories.push(
        <div className="single-category-container" ref={iconsRef[i]}>
          <FontAwesomeIcon
            onMouseEnter={() => {
              isOpenSetArray[i](true);
            }}
            onMouseLeave={() => {
              isOpenSetArray[i](false);
            }}
            className="category-icon"
            onClick={() => {
              navigate(
                "/categoria/" +
                  queryResultCategories.data.categories.nodes[i].name
              );
              switchIconAnimation &&
                switchIconAnimation.current.classList.remove("active");
              iconsRef[i].current.classList.add("active");
              setSwitchIconAnimation(iconsRef[i]);
            }}
            icon={icons[i]}
          />
          <ToolTip text={toolTipText[i]} isOpen={isOpenArray[i]} />
          <div className="bubble"></div>
        </div>
      );
    }

    return resultCategories;
  };
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <p className="logo">Travelly</p>
        <div className="category">
          <div className="single-category-container" ref={iconAnimation}>
            <FontAwesomeIcon
              onMouseEnter={() => {
                setIsOpenOne(true);
              }}
              onMouseLeave={() => {
                setIsOpenOne(false);
              }}
              className="home"
              icon={faHouse}
              onClick={() => {
                navigate("/");
                switchIconAnimation &&
                  switchIconAnimation.current.classList.remove("active");
                iconAnimation.current.classList.add("active");
                setSwitchIconAnimation(iconAnimation);
              }}
            />
            <ToolTip text="Home" isOpen={isOpenOne} />
            <div className="bubble"></div>
          </div>

          {queryResultCategories ? renderCategories() : ""}
        </div>
        <div className="search-section">
          <FontAwesomeIcon
            onClick={() => {
              switchInput.current.classList.toggle("active");
            }}
            className="icon"
            icon={faMagnifyingGlass}
          />
          <div className="input" ref={switchInput}>
            <input
              className="input-field"
              type="text"
              placeholder="cosa vuoi cercare?"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <input
              className="submit"
              type="submit"
              value="cerca"
              onClick={() => navigate("/search/" + inputValue)}
            />
          </div>
        </div>

        <a
          target="_blank"
          href="https://novadgt.netlify.app/"
          className="portfolio-wrapper"
        >
          <p
            onMouseEnter={() => {
              setIsOpenLogo(true);
            }}
            onMouseLeave={() => {
              setIsOpenLogo(false);
            }}
            className="portfolio-name"
          >
            N
          </p>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;

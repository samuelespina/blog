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
  const [darkModeToolTip, setDarkModeToolTip] = useState<boolean>(false);

  const [darkModeState, setDarkModeState] = useState<string>("off");

  const [firstClickHomeFlag, setFirstClickHomeFlag] = useState<number>(0);

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

  const darkMode = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    axios({
      method: "post",
      url: "https://dev-blog-wp.pantheonsite.io/graphql",
      data: {
        query: queryCategories,
      },
    }).then((res) => {
      setQueryResultCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (switchInput.current) {
      document.addEventListener("mousedown", (e) => {
        if (!switchInput.current.contains(e.target as any)) {
          switchInput.current.classList.remove("active");
        }
      });
    }
  }, [switchInput.current]);

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
              setFirstClickHomeFlag(1);
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

  const firstClickBlock = () => {
    if (firstClickHomeFlag > 0) {
      if (switchIconAnimation) {
        switchIconAnimation.current.classList.remove("active");
        iconAnimation.current.classList.add("active");
        setSwitchIconAnimation(iconAnimation);
      }
    }
  };

  useEffect(() => {
    console.log(firstClickHomeFlag);
  }, [firstClickHomeFlag]);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <p className="logo">Travelly</p>

        <div className="darkmode-switch-button-wrapper">
          <ToolTip
            text={"Dark mode " + darkModeState}
            isOpen={darkModeToolTip}
          />
          <div
            className="darkmode-switch-button"
            onMouseEnter={() => {
              setDarkModeToolTip(true);
            }}
            onMouseLeave={() => {
              setDarkModeToolTip(false);
            }}
            onClick={() => {
              document.body.classList.toggle("active");
              darkMode.current.classList.toggle("active");
              darkMode.current.classList.contains("active")
                ? setDarkModeState("on")
                : setDarkModeState("off");
            }}
          >
            <div ref={darkMode} className="switch-flag"></div>
          </div>
        </div>
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
                firstClickBlock();
                navigate("/");
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
              switchIconAnimation &&
                switchIconAnimation.current.classList.remove("active");
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
              onKeyDown={(e) => {
                e.keyCode == 13 && navigate("/search/" + inputValue);
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

        <div className="portfolio-wrapper">
          <ToolTip text="NovaDGT" isOpen={isOpenLogo} />
          <a
            target="_blank"
            href="https://novadgt.netlify.app/"
            className="portfolio-name-wrapper"
            onMouseEnter={() => {
              setIsOpenLogo(true);
            }}
            onMouseLeave={() => {
              setIsOpenLogo(false);
            }}
          >
            <p className="portfolio-name">N</p>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

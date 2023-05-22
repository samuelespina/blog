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
  const [queryResultCategories, setQueryResultCategories] =
    useState<interfaceCategoriesNames | null>(null);
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
          <ToolTip text={toolTipText[i]} />
          <FontAwesomeIcon
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
          <div className="bubble"></div>
        </div>
      );
    }

    return resultCategories;
  };
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <p className="logo">TraveLLy</p>
        <div className="category">
          <div className="single-category-container" ref={iconAnimation}>
            <ToolTip text="Home" />
            <FontAwesomeIcon
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
              value="submit"
              onClick={() => navigate("/search/" + inputValue)}
            />
          </div>
        </div>

        <div className="profile-img-wrapper">
          <img className="profile-img" src="" alt="" />
        </div>
        {/* inizialmente dente di ingrandimento, onclick si apre la sezione di input */}
      </nav>
    </header>
  );
};

export default Navbar;

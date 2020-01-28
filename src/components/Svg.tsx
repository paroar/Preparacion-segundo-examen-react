import React from "react";
import svg from "../images/sprite.svg";

type SvgProps = {
  name: string;
};

const Svg: React.FC<SvgProps> = ({ name }) => {
  return (
    <svg className="nav__icon">
      <use xlinkHref={svg + `#icon-${name}`}></use>
    </svg>
  );
};
export default Svg;

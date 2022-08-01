import React from "react";
import { Link } from "react-router-dom";

import "./Link.style.scss";

type LinkProps = {
  linkTo: string;
  text: string;
};

export const MenuItem = (props: LinkProps) => {
  const { linkTo, text } = props;

  return (
    <Link to={`${linkTo}`} className="MenuItem">
      {text}
    </Link>
  );
};

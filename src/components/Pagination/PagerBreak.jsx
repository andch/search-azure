import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const PagerBreak = ({ text }) => {
  const classes = ["pager__item", "pager__item__ellipsis"];

  return (
    <li className={classnames(classes)}>
      <span aria-hidden="true">{text}</span>
    </li>
  );
};

PagerBreak.propTypes = {
  text: PropTypes.string,
};

PagerBreak.defaultProps = {
  text: "...",
};

export default PagerBreak;

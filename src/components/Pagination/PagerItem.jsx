import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const PagerItem = ({ page, onClick, current, text, totalPages }) => {
  const classes = [
    "pager__item",
    page === current ? "pager__item--active" : "",
  ];

  const handleClick = () => {
    onClick(page);
  };
  const ariaLabelText =
    page === current
      ? `Page ${text} of ${totalPages} selected`
      : `Page ${text} of ${totalPages}`;
  return (
    <li className={classnames(classes)}>
      <button
        className="pager__item__link link"
        aria-label={ariaLabelText}
        type="button"
        onClick={handleClick}
      >
        {text}
      </button>
    </li>
  );
};

PagerItem.propTypes = {
  current: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

PagerItem.defaultProps = {
  onClick: PropTypes.func,
};

export default PagerItem;

import React, { useEffect } from "react";
import PropTypes from "prop-types";

import PagerItem from "./PagerItem";
import PagerBreak from "./PagerBreak";

const Pagination = ({ totalPages, current, onChange }) => {
  const nextPrevThreshold = 7;

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1);
  });

  const handlePageClick = (p) => {
    onChange(p);
  };

  const handlePrevClick = () => {
    const prevPage = current - 1;
    onChange(prevPage);
  };

  const handleNextClick = () => {
    const nextPage = current + 1;
    onChange(nextPage);
  };

  const nextBtnIsDisabled = () =>
    current === totalPages || totalPages <= nextPrevThreshold;

  const prevBtnIsDisabled = () =>
    current === 1 || totalPages <= nextPrevThreshold;

  const getRange = (start, end) =>
    Array(end - start + 1)
      .fill()
      .map((v, i) => i + start);

  const createPager = () => {
    const curr = current;
    const length = totalPages;
    const delta = length === nextPrevThreshold ? nextPrevThreshold : 3;
    const dotsRange = 3;
    const range = {
      start: Math.round(curr - delta / dotsRange) + 1,
      end: Math.round(curr + delta / dotsRange) + 1,
    };

    if (range.start - 1 === 1 || range.end + 1 === length) {
      range.start += 1;
      range.end += 1;
    }

    const createPages = () => {
      if (curr > delta && range.end <= length - delta) {
        return getRange(
          Math.min(range.start, length - delta),
          Math.min(range.end, length)
        );
      }
      if (curr > delta && range.end > length - delta && totalPages === 4) {
        return getRange(length - delta, length);
      }
      if (curr > delta && range.end > length - delta) {
        return getRange(length - delta - 1, length);
      }
      return getRange(1, Math.min(length, delta + 2));
    };

    let pages = createPages();

    const withDots = (value, pair) =>
      pages.length + 1 !== length ? pair : [value];

    if (pages[0] !== 1) {
      pages = withDots(1, [1, "..."]).concat(pages);
    }

    if (pages[pages.length - 1] < length) {
      pages = pages.concat(withDots(length, ["...", length]));
    }

    return pages;
  };

  const list = createPager().map((item) => {
    if (item === "...") {
      return <PagerBreak text="..." key={Math.random().toString()} />;
    }
    return (
      <PagerItem
        text={item}
        current={current}
        page={item}
        onClick={handlePageClick}
        key={Math.random().toString()}
        totalPages={totalPages}
      />
    );
  });

  // Do not render pager if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pager" role="navigation">
      <ul className="pager__items js-pager__items">
        <li
          className="pager__item pager__previous"
          hidden={prevBtnIsDisabled()}
        >
          <button
            type="button"
            className="pager__previous__link link"
            aria-label="Go to previous page"
            rel="prev"
            onClick={handlePrevClick}
          >
            {"<"}
          </button>
        </li>

        {list}

        <li
          className="pager__item pager__item--next"
          hidden={nextBtnIsDisabled()}
        >
          <button
            type="button"
            className="pager__next__link link"
            aria-label="Go to next page"
            rel="next"
            onClick={handleNextClick}
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;

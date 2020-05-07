import PropTypes from "prop-types";
import React from "react";

import { appendClassName } from "@elastic/react-search-ui-views/lib/view-helpers";

function ResultsContainer({ children, className, ...rest }) {
  const childrenArray = React.Children.toArray(children);
  console.warn(childrenArray);
  return (
    <ul
      className={appendClassName("sui-results-container", className)}
      {...rest}
    >
      {childrenArray.map((child, index) =>
        React.cloneElement(child, { tileIndex: index + 1 })
      )}
    </ul>
  );
}

ResultsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ResultsContainer.defaultProps = {
  className: "",
};

export default ResultsContainer;

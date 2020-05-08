import React from "react";
import PropTypes from "prop-types";

function ResultContainer({ result }) {
  const { business_title: businessTitle, job_id: jobId } = result;
  return <h3 key={jobId}>{businessTitle}</h3>;
}

export default ResultContainer;

ResultContainer.propTypes = {
  result: PropTypes.object.isRequired,
};

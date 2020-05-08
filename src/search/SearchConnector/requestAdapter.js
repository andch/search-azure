export default function adaptRequest(state, queryConfig) {
  const { searchTerm, resultsPerPage, current, sortField } = state;
  // @TODO Maybe need rebuild.
  return {
    q: searchTerm,
    count: resultsPerPage,
    start: (current - 1) * resultsPerPage,
    ...(queryConfig.extraParams && queryConfig.extraParams),
    sort: sortField,
  };
}

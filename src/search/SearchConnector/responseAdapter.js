export const getResults = (records) => {
  const toObjectWithRaw = (value) => ({ raw: value });

  return records.map((record) => {
    const { id: itemId, ...rest } = record;
    rest.id = toObjectWithRaw(itemId);

    return rest;
  });
};

export function adaptResponse(response, resultsPerPage) {
  const results = response.value ? getResults(response.value) : [];
  const totalPages = Math.ceil(response.value.length / resultsPerPage);
  const totalResults = response.value.length;
  return {
    results,
    totalPages,
    totalResults,
  };
}

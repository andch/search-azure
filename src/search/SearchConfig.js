import SearchConnector from "./SearchConnector/SearchConnector";

const connector = new SearchConnector({
  endpoint: "https://azs-playground.search.windows.net/indexes/nycjobs/docs",
  apiKey: "252044BE3886FE4A8E3BAA4F595114BB",
  apiVersion: "2019-05-06",
});

const config = {
  initialState: {
    resultsPerPage: 10,
  },
  // searchQuery: {
  //   extraParams: {
  //     expand: "availability,images,prices,represented_products,variations",
  //   },
  // },
  debug: true,
  // autocompleteQuery: {
  //   results: {
  //     resultsPerPage: 5,
  //     extraParams: {
  //       expand: "images",
  //     },
  //   },
  // },
  apiConnector: connector,
  hasA11yNotifications: true,
  a11yNotificationMessages: {
    moreFilters: null, // Reset more filters message to have next focused filter pronounced by screen readers.
  },
  onSearch: (state, queryConfig, next) => {
    const newState = {
      ...state,
    };

    return next(newState, queryConfig);
  },
};

export default config;

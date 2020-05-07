import querystring from "querystring";
import { adaptResponse } from "./responseAdapter";
import adaptRequest from "./requestAdapter";

// Helper function to trim search query.
const createUrlQuery = (endpoint, params) => {
  const url = new URL(endpoint);
  url.search = new URLSearchParams(params).toString();
  return url.href;
};

class SearchConnector {
  /**
   * @callback next
   * @param {Object} updatedQueryOptions The options to send to the API
   */

  /**
   * @callback hook
   * @param {Object} queryOptions The options that are about to be sent to the
   *   API
   * @param {next} next The options that are about to be sent to the API
   */

  /**
   * @typedef Options
   * @param {string} endpoint Salesforce Commerce Cloud endpoint or proxy
   *   endpoint URL
   * @param {string} clientId Salesforce Commerce Cloud client id
   * @param {hook} beforeSearchCall=(queryOptions,next)=>next(queryOptions) A
   *   hook to amend query options before the request is sent to the API in a
   *   query on an "onSearch" event.
   * @param {hook} beforeAutocompleteResultsCall=(queryOptions,next)=>next(queryOptions) A
   *   hook to amend query options before the request is sent to the API in a
   *   "results" query on an "onAutocomplete" event.
   * @param {hook} beforeAutocompleteSuggestionsCall=(queryOptions,next)=>next(queryOptions) A
   *   hook to amend query options before the request is sent to the API in a
   *   "suggestions" query on an "onAutocomplete" event.
   */

  /**
   * @param {Options} options
   */
  constructor({
    endpoint,
    apiKey,
    apiVersion,
    beforeSearchCall = (queryOptions, next) => next(queryOptions),
    beforeAutocompleteResultsCall = (queryOptions, next) => next(queryOptions),
    beforeAutocompleteSuggestionsCall = (queryOptions, next) =>
      next(queryOptions),
  }) {
    if (!endpoint || !apiKey) {
      throw Error("endpoint, site and API key are required");
    }

    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.apiVersion = apiVersion;
    this.beforeSearchCall = beforeSearchCall;
    this.beforeAutocompleteResultsCall = beforeAutocompleteResultsCall;
    this.beforeAutocompleteSuggestionsCall = beforeAutocompleteSuggestionsCall;
  }

  async search(query) {
    const params = {
      search: `${querystring.stringify(query)}`,
      "api-version": this.apiVersion,
    };
    const endpointWithParams = createUrlQuery(this.endpoint, params);
    console.log(query);
    const response = await fetch(`${endpointWithParams}`, {
      method: "GET",
      headers: {
        "api-key": this.apiKey,
      },
    });

    return response.json();
  }

  onSearch(state, queryConfig) {
    const {
      current,
      filters,
      resultsPerPage,
      sortDirection,
      sortField,
    } = queryConfig;

    const options = adaptRequest(
      {
        ...state,
        ...(current !== undefined && { current }),
        ...(filters !== undefined && { filters }),
        ...(resultsPerPage !== undefined && { resultsPerPage }),
        ...(sortDirection !== undefined && { sortDirection }),
        ...(sortField !== undefined && { sortField }),
      },
      queryConfig
    );

    return this.beforeSearchCall(options, async (newOptions) => {
      const response = await this.search({
        ...newOptions,
        q: newOptions.q,
      });
      return adaptResponse(response, state.resultsPerPage);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onAutocomplete() {}

  // eslint-disable-next-line class-methods-use-this
  onResultClick() {
    // Not implemented, override via handlers if needed.
  }

  // eslint-disable-next-line class-methods-use-this
  onAutocompleteResultClick() {
    // Not implemented, override via handlers if needed.
  }
}

export default SearchConnector;

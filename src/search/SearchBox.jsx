import React from "react";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import searchConfig from "./SearchConfig";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import ResultContainer from "./SearchResult/ResultContainer";

export default function SampleSearch() {
  return (
    <SearchProvider config={searchConfig}>
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={
            <Results resultView={(props) => <ResultContainer {...props} />} />
          }
        />
      </div>
    </SearchProvider>
  );
}

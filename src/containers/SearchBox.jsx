import React from "react";
import {
  SearchProvider,
  Results,
  SearchBox,
  Paging,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import searchConfig from "../SearchConfig/SearchConfig";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import ResultContainer from "./SearchResult/ResultContainer";
import Pagination from "../components/Pagination";

export default function SampleSearch() {
  return (
    <SearchProvider config={searchConfig}>
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={
            <Results resultView={(props) => <ResultContainer {...props} />} />
          }
          bodyFooter={<Paging view={(props) => <Pagination {...props} />} />}
        />
      </div>
    </SearchProvider>
  );
}

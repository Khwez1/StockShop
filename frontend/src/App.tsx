import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import CardList from './Components/CardList'
import Search from './Components/Search';
import { type CompanySearch } from '../company';
import { searchCompanies } from './api';

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([])
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement, Element>) => {    
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(searchResult);
  };

  return (
    <>
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
      {serverError && <div>Unable to connect to API</div>}
    </>
  )
}

export default App

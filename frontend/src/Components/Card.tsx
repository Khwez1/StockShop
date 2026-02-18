import React, { type JSX } from "react";
import type { CompanySearch } from "../../company";

interface Props {
  id: string
  searchResult : CompanySearch
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
}: Props): JSX.Element => {
  return (
    <div className="card">
      <img alt="Company logo" height={100} />
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className="info">
        {searchResult.exchange} - {searchResult.exchangeFullName}
      </p>
    </div>
  );
};

export default Card;

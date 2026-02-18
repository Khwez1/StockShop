import React, { type ChangeEvent, type JSX, type SyntheticEvent } from 'react'

interface Props {
  onClick: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement, Element>) => void;
};

const Search: React.FC<Props> = ({onClick, search, handleChange}: Props): JSX.Element => {
  
  return (
    <div>
      <input value={search} onChange={(e) => handleChange(e)} type="text" />
      <button onClick={(e) => onClick(e)}/>
    </div>
  );
}

export default Search;
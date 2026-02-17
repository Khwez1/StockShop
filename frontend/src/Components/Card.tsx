import React, { type JSX } from "react";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
  icon: string
}

const Card: React.FC<Props> = ({
  companyName,
  ticker,
  price,
  icon
}: Props): JSX.Element => {
  return (
    <div className="card">
      <img src={icon} alt="Image" height={100} />
      <div className="details">
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
      </div>
      <p className="info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel consequatur
        nulla repellendus atque sequi. Vitae commodi inventore accusamus ea
        corporis necessitatibus est blanditiis quos, delectus obcaecati unde in
        ipsam qui.
      </p>
    </div>
  );
};

export default Card;

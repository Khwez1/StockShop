import React, { type JSX } from 'react';
import Card from './Card'

interface Props {}

const CardList:React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
        <Card companyName="Apple" ticker="APPL" price={260} icon='https://cdn-images.imagevenue.com/ca/0b/1a/ME1CE7CK_o.png' />
        <Card companyName="Microsoft" ticker="MSFT" price={398} icon='https://cdn-images.imagevenue.com/54/32/bd/ME1CE7CV_o.png' />
        <Card companyName="Telsa" ticker="TSLA" price={404} icon='https://cdn-images.imagevenue.com/3a/71/c4/ME1CE7CC_o.png' />
    </div>
  );
}

export default CardList
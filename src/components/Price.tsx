import React from 'react';
import styled from "styled-components";

interface Props {
    price: number
    priceChange: number
}

const Wrapper = styled.p`
  color: ${props => props.theme.specialBlue};
  font-size: 1.2em;
`;

const Price: React.FC<Props> = ({ price, priceChange }) => {
    return (
        <Wrapper>
            Price : {price} - Change in 24H :  {priceChange}
        </Wrapper>

    );
};

export default Price;
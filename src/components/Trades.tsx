// src/components/CurrencyPairForm.tsx
import React, { useState } from 'react';
import Trade from '../interfaces/Trade';
import { convertPrice } from '../utils/functions';
import styled from "styled-components";
import { specialBlue } from '../utils/constants';

const Wrapper = styled.table`
  th, td {
  padding: 6px;
}

th{
    cursor: pointer;
}
`;

interface Props {
    trades: Trade[]
}

const Trades: React.FC<Props> = ({ trades }) => {

    const [order, setOrder] = useState('time');

    const changeOrder = (type: string) => {
        setOrder(type);
    }

    return (
        <Wrapper>
            <thead>
                <tr>
                    <th style={order === 'price' ? { color: specialBlue } : {}} onClick={() => changeOrder('price')}>Price</th>
                    <th style={order === 'qty' ? { color: specialBlue } : {}} onClick={() => changeOrder('qty')}>Quantity</th>
                    <th style={order === 'time' ? { color: specialBlue } : {}} onClick={() => changeOrder('time')}>Time</th>
                </tr>
            </thead>
            <tbody>
                {trades.sort((a, b) => a[order] < b[order] ? 1 : -1)
                    .map(trade =>
                        <tr key={trade.id}>
                            <td>{convertPrice(trade.price)}</td>
                            <td>{trade.qty}</td>
                            <td>{new Date(trade.time).toLocaleString()}</td>
                        </tr>
                    )}
            </tbody>
        </Wrapper>
    );
};

export default Trades;
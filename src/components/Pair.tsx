import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { BINANCE_API } from '../utils/constants';

const SelectWrapper = styled.select`
background-color: rgb(200,200,200);
border: none;
  padding: 4px;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
`;

interface Props {
    fetchMarketData(pair: string): void
}

const Pair: React.FC<Props> = ({ fetchMarketData }) => {
    const [availablePairs, setAvailablePairs] = useState<string[]>([]);
    const [selectedPair, setSelectedPair] = useState<string>('');

    useEffect(() => {
        // Fetch available currency pairs from Binance API and update the state
        const fetchAvailablePairs = async () => {
            try {
                let response = await axios.get(`${BINANCE_API}/exchangeInfo`);
                const tradingPairs = response.data.symbols;

                // Sort the trading pairs by trading volume in descending order.
                // tradingPairs.sort((a:any, b:any) => b.tradingVolume - a.tradingVolume);
                tradingPairs.sort((a: any, b: any) => a.symbol.localeCompare(b.symbol));

                // Take the top N pairs based on trading volume.
                //  const topPairs = tradingPairs.slice(0, 100);
                const formattedPairs = tradingPairs.map((pair: any) => pair.symbol);
                setAvailablePairs(formattedPairs);
            } catch (error) {
                console.error('Error fetching available pairs:', error);
            }
        };

        fetchAvailablePairs();
    }, []);

    const handlePairChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPair(event.target.value);
        fetchMarketData(selectedPair);
    };

    return (
        <form>
            <SelectWrapper value={selectedPair} onChange={handlePairChange}>
                {availablePairs.map(pair =>
                    <option key={pair} value={pair}>{pair}</option>
                )}
            </SelectWrapper>
        </form>
    );
};

export default Pair;
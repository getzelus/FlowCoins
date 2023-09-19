// src/components/CurrencyPairForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { convertPrice } from '../utils/functions';
import { BINANCE_API } from '../utils/constants';

import Pair from './Pair';
import Price from './Price';
import Trades from './Trades';
import Trade from '../interfaces/Trade';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 2vh;
`;

const FlowCoins: React.FC = () => {

  const [status, setStatus] = useState<string>('begin');
  const [price, setPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [trades, setTrades] = useState<Trade[]>([]);

  const fetchMarketData = async (pair: string) => {
    setStatus('loading');
    try {
      const tickerResponse = await axios.get(`${BINANCE_API}/ticker/price`, {
        params: { symbol: pair },
      });

      const twentyFourHourTickerResponse = await axios.get(`${BINANCE_API}/ticker/24hr`, {
        params: { symbol: pair },
      });

      const recentTradesResponse = await axios.get(`${BINANCE_API}/trades`, {
        params: { symbol: pair, limit: 100 },
      });

      // Handle the responses and display the data
      setPrice(convertPrice(tickerResponse.data.price));
      setPriceChange(convertPrice(twentyFourHourTickerResponse.data.priceChange));
      setTrades(recentTradesResponse.data);
      setStatus('complete');
    } catch (error) {
      console.error('Error fetching data:', error);
      setStatus('error');
    }
  };

  return (
    <Wrapper>
      <div>
        <Pair fetchMarketData={fetchMarketData} />
      </div>

      {
        status === 'begin' ? '' :
          status === 'error' ? 'Error, try again.' :
            status === 'loading' ? 'Loading...' :
              status === 'complete' ? <>
                <div>
                  <Price price={price} priceChange={priceChange} />
                </div>

                <div>
                  <Trades trades={trades} />
                </div>
              </> : ''
      }
    </Wrapper>
  );
};

export default FlowCoins;
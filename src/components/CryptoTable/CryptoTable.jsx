import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../../features/crypto/cryptoSlice';
import { formatCurrency, formatPercentage, formatLargeNumber } from '../../utils/formatters';
import styles from './CryptoTable.module.css';
import LineChart from '../LineChart/LineChart';

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.cryptoTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td className={styles.nameCell}>
                <img src={asset.logo} alt={asset.name} className={styles.logo} />
                <span>{asset.name}</span>
                <span className={styles.symbol}>{asset.symbol}</span>
              </td>
              <td>{formatCurrency(asset.price)}</td>
              <td className={getChangeClass(asset.priceChange1h)}>
                {formatPercentage(asset.priceChange1h)}
              </td>
              <td className={getChangeClass(asset.priceChange24h)}>
                {formatPercentage(asset.priceChange24h)}
              </td>
              <td className={getChangeClass(asset.priceChange7d)}>
                {formatPercentage(asset.priceChange7d)}
              </td>
              <td>{formatLargeNumber(asset.marketCap)}</td>
              <td>{formatLargeNumber(asset.volume24h)}</td>
              <td>{formatLargeNumber(asset.circulatingSupply)} {asset.symbol}</td>
              <td>{asset.maxSupply ? formatLargeNumber(asset.maxSupply) : '∞'} {asset.symbol}</td>
              <td>
                <div className={styles.chartContainer}>
                  <LineChart data={asset.sparkline} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getChangeClass = (value) => {
  return value >= 0 ? styles.positive : styles.negative;
};

export default CryptoTable;
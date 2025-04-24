import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'logos/download',
      price: 50234.56,
      priceChange1h: 0.42,
      priceChange24h: 2.35,
      priceChange7d: -1.28,
      marketCap: 950000000000,
      volume24h: 25000000000,
      circulatingSupply: 19000000,
      maxSupply: 21000000,
      sparkline: [50000, 51000, 49500, 50200, 49800, 50500, 50234.56],
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'assets/logos/download (1).png',
      price: 2650.34,
      priceChange1h: -0.15,
      priceChange24h: 1.75,
      priceChange7d: 3.42,
      marketCap: 318000000000,
      volume24h: 15000000000,
      circulatingSupply: 120000000,
      maxSupply: null,
      sparkline: [2600, 2550, 2630, 2580, 2620, 2670, 2650.34],
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: '/logos/download (2).png',
      price: 1.00,
      priceChange1h: 0.01,
      priceChange24h: 0.01,
      priceChange7d: 0.01,
      marketCap: 83000000000,
      volume24h: 50000000000,
      circulatingSupply: 83000000000,
      maxSupply: null,
      sparkline: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 4,
      name: 'BNB',
      symbol: 'BNB',
      logo: '/logos/download (3).png',
      price: 520.67,
      priceChange1h: 0.87,
      priceChange24h: -0.45,
      priceChange7d: 2.13,
      marketCap: 79000000000,
      volume24h: 1200000000,
      circulatingSupply: 151000000,
      maxSupply: 170000000,
      sparkline: [510, 515, 508, 518, 512, 525, 520.67],
    },
    {
      id: 5,
      name: 'Solana',
      symbol: 'SOL',
      logo: '/logos/download (4).png',
      price: 145.23,
      priceChange1h: 1.25,
      priceChange24h: 5.67,
      priceChange7d: 12.34,
      marketCap: 61000000000,
      volume24h: 2500000000,
      circulatingSupply: 420000000,
      maxSupply: null,
      sparkline: [130, 135, 132, 140, 138, 143, 145.23],
    },
  ],
  status: 'idle',
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { id, price, changes } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
        asset.priceChange1h = changes.priceChange1h;
        asset.priceChange24h = changes.priceChange24h;
        asset.priceChange7d = changes.priceChange7d;
        asset.volume24h = changes.volume24h;
        
        // Update sparkline - shift array and add new price
        asset.sparkline.shift();
        asset.sparkline.push(price);
      }
    },
  },
});

export const { updatePrice } = cryptoSlice.actions;

export const selectAllAssets = (state) => state.crypto.assets;
export const selectAssetById = (state, assetId) => 
  state.crypto.assets.find(asset => asset.id === assetId);

export default cryptoSlice.reducer;
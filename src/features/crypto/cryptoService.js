import { updatePrice } from './cryptoSlice';

export class CryptoWebSocket {
  constructor(store) {
    this.store = store;
    this.interval = null;
  }

  connect() {
    this.interval = setInterval(() => {
      this.generateRandomUpdates();
    }, 1500);
  }

  disconnect() {
    clearInterval(this.interval);
  }

  generateRandomUpdates() {
    const assets = this.store.getState().crypto.assets;
    
    assets.forEach(asset => {
      const currentPrice = asset.price;
      const changeFactor = (Math.random() - 0.5) * 0.02; // -1% to +1%
      const newPrice = currentPrice * (1 + changeFactor);
      
      const changes = {
        priceChange1h: this.calculateRandomChange(),
        priceChange24h: this.calculateRandomChange(),
        priceChange7d: this.calculateRandomChange(),
        volume24h: asset.volume24h * (1 + (Math.random() - 0.5) * 0.1),
      };

      this.store.dispatch(updatePrice({
        id: asset.id,
        price: parseFloat(newPrice.toFixed(2)),
        changes,
      }));
    });
  }

  calculateRandomChange() {
    return parseFloat(((Math.random() - 0.5) * 2).toFixed(2));
  }
}
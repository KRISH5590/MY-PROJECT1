import { mandiPrices } from '../data/mockData'

export default function PriceTicker() {
  const items = [...mandiPrices, ...mandiPrices] // duplicate for seamless scroll

  return (
    <div className="price-ticker-bar" id="price-ticker">
      <div className="price-ticker-track">
        {items.map((item, i) => {
          const change = ((item.price - item.prevPrice) / item.prevPrice * 100).toFixed(1)
          const isUp = item.price >= item.prevPrice
          return (
            <div className="ticker-item" key={`${item.id}-${i}`}>
              <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
              <span className="ticker-crop">{item.crop}</span>
              <span className="ticker-price">₹{item.price.toLocaleString('en-IN')}</span>
              <span className={`ticker-change ${isUp ? 'up' : 'down'}`}>
                {isUp ? '▲' : '▼'} {Math.abs(change)}%
              </span>
              <span className="ticker-market">{item.market}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

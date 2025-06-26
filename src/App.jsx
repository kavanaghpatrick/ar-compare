import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    {
      id: 1,
      name: "Xreal One Pro",
      brand: "Xreal",
      price: "$599",
      rating: 4.5,
      reviews: 88,
      fieldOfView: "57°",
      brightness: "700 nits",
      audio: "Sound by Bose",
      weight: "87g",
      description: "World's first AR glasses with self-developed spatial computing chip"
    },
    {
      id: 2,
      name: "Xreal One",
      brand: "Xreal", 
      price: "$499",
      rating: 4.3,
      reviews: 156,
      fieldOfView: "50°",
      brightness: "600 nits",
      audio: "Sound by Bose",
      weight: "84g",
      description: "Accessible AR glasses with XREAL X1 chip and premium features"
    },
    {
      id: 3,
      name: "Rokid AR Spatial",
      brand: "Rokid",
      price: "$598",
      rating: 4.4,
      reviews: 203,
      fieldOfView: "50°",
      brightness: "600 nits",
      audio: "Quad-speaker system",
      weight: "75g",
      description: "Top-performing AR glasses for multiple monitors with 300-inch virtual screen"
    },
    {
      id: 4,
      name: "Viture Pro XR",
      brand: "Viture",
      price: "$449",
      rating: 4.6,
      reviews: 342,
      fieldOfView: "46°",
      brightness: "4000 nits",
      audio: "Harman AudioEFX 3D",
      weight: "78g",
      description: "Ultimate XR glasses with 2D to 3D conversion and 4000 nits brightness"
    },
    {
      id: 5,
      name: "RayNeo Air 3s XR",
      brand: "RayNeo",
      price: "$269",
      rating: 4.1,
      reviews: 128,
      fieldOfView: "45°",
      brightness: "500 nits",
      audio: "Stereo speakers",
      weight: "82g",
      description: "Affordable XR glasses with top-tier audiovisual experience"
    },
    {
      id: 6,
      name: "RayNeo X3 Pro",
      brand: "RayNeo",
      price: "$899",
      rating: 0,
      reviews: 0,
      fieldOfView: "25°",
      brightness: "5000 nits peak",
      audio: "Spatial audio",
      weight: "76g",
      description: "Cutting-edge microLED AR glasses with AI and 5000-nit brightness"
    }
  ]

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star star-filled" : "star star-empty"}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">AR Compare</h1>
          <nav className="nav">
            <a href="#">Products</a>
            <a href="#">Brands</a>
            <a href="#">Reviews</a>
            <a href="#">News</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            The Ultimate AR & AI Glasses Comparison
          </h1>
          <p className="hero-subtitle">
            Compare specs, features, and prices of the latest AR glasses from top manufacturers. 
            Make informed decisions with our comprehensive database.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Start Comparing
            </button>
            <button className="btn btn-outline">
              View All Products
            </button>
          </div>
          
          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat-number">4+</div>
              <div className="stat-label">Brands</div>
            </div>
            <div className="stat">
              <div className="stat-number">6+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat">
              <div className="stat-number">Daily</div>
              <div className="stat-label">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-container">
          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search AR glasses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <h2 className="section-title">{filteredProducts.length} Products Found</h2>
          
          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <div className="product-icon">👓</div>
                </div>
                
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price}</div>
                
                {/* Rating */}
                <div className="rating">
                  {product.rating > 0 ? (
                    <>
                      <div className="stars">{renderStars(product.rating)}</div>
                      <span className="rating-text">{product.rating}</span>
                      <span className="rating-reviews">({product.reviews} reviews)</span>
                    </>
                  ) : (
                    <span className="rating-reviews">No rating yet ({product.reviews} reviews)</span>
                  )}
                </div>
                
                {/* Specs */}
                <div className="specs-grid">
                  <div className="spec-item">
                    👁️ {product.fieldOfView}
                  </div>
                  <div className="spec-item">
                    ⚡ {product.brightness}
                  </div>
                  <div className="spec-item">
                    🔊 {product.audio}
                  </div>
                  <div className="spec-item">
                    ⚖️ {product.weight}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="product-actions">
                  <button className="action-btn action-btn-compare">
                    +Compare
                  </button>
                  <button className="action-btn action-btn-details">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App


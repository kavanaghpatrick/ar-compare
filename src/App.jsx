import { useState } from 'react'
import { Search, Star, Eye, Zap, Volume2, Weight, Smartphone, Cpu, ArrowLeft, Grid3X3, BarChart3, Filter, SortAsc, SortDesc, X, Check, Minus, ShoppingCart, Plus } from 'lucide-react'
import { arGlassesData } from './data/products.js'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('specs')
  const [currentView, setCurrentView] = useState('main') // 'main', 'comparison', 'details'
  const [comparisonView, setComparisonView] = useState('grid') // 'grid' or 'table'
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showCart, setShowCart] = useState(false)

  // Use the comprehensive product database
  const products = arGlassesData

  const filteredProducts = products.filter(product =>
    product.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else if (prev.length < 6) { // Allow up to 6 products for comparison
        return [...prev, productId]
      }
      return prev
    })
  }

  const removeFromComparison = (productId) => {
    setSelectedProducts(prev => prev.filter(id => id !== productId))
  }

  const clearComparison = () => {
    setSelectedProducts([])
  }

  const showProductDetails = (product) => {
    setSelectedProduct(product)
    setCurrentView('details')
  }

  const goToComparison = () => {
    setCurrentView('comparison')
  }

  const goToMain = () => {
    setCurrentView('main')
    setSelectedProduct(null)
    setActiveTab('specs')
  }

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id))

  // Sort selected products for comparison
  const sortedSelectedProducts = [...selectedProductsData].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'price':
        aValue = a.price
        bValue = b.price
        break
      case 'rating':
        aValue = a.rating
        bValue = b.rating
        break
      case 'brand':
        aValue = a.brand
        bValue = b.brand
        break
      case 'fov':
        aValue = parseInt(a.specifications.display.fov) || 0
        bValue = parseInt(b.specifications.display.fov) || 0
        break
      case 'weight':
        aValue = parseInt(a.specifications.design.weight) || 0
        bValue = parseInt(b.specifications.design.weight) || 0
        break
      default:
        aValue = a.price
        bValue = b.price
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Floating Comparison Cart Component
  const ComparisonCart = () => {
    if (selectedProducts.length === 0) return null

    return (
      <div className="comparison-cart">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingCart className="cart-icon" />
            <span>Compare ({selectedProducts.length}/6)</span>
          </div>
          <button 
            className="cart-toggle"
            onClick={() => setShowCart(!showCart)}
          >
            {showCart ? <Minus /> : <Plus />}
          </button>
        </div>
        
        {showCart && (
          <div className="cart-content">
            <div className="cart-products">
              {selectedProductsData.map(product => (
                <div key={product.id} className="cart-product">
                  <div className="cart-product-info">
                    <span className="cart-product-name">{product.shortName}</span>
                    <span className="cart-product-price">${product.price}</span>
                  </div>
                  <button 
                    className="cart-remove"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-actions">
              {selectedProducts.length >= 2 && (
                <button 
                  className="cart-compare-btn"
                  onClick={goToComparison}
                >
                  <BarChart3 />
                  Compare {selectedProducts.length} Products
                </button>
              )}
              <button 
                className="cart-clear-btn"
                onClick={clearComparison}
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Product Details View
  if (currentView === 'details' && selectedProduct) {
    return (
      <div className="app-container">
        <ComparisonCart />
        <div className="product-details">
          <div className="product-details-header">
            <button onClick={goToMain} className="back-button">
              <ArrowLeft size={20} />
              Back to Products
            </button>
            <h1>{selectedProduct.fullName}</h1>
            <p className="product-price">${selectedProduct.price}</p>
          </div>

          <div className="product-tabs">
            <button 
              className={`tab ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button 
              className={`tab ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={`tab ${activeTab === 'pros-cons' ? 'active' : ''}`}
              onClick={() => setActiveTab('pros-cons')}
            >
              Pros & Cons
            </button>
            <button 
              className={`tab ${activeTab === 'company' ? 'active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Company Info
            </button>
          </div>

          <div className="product-content">
          {activeTab === 'specs' && (
            <div className="specs-grid">
              <div className="spec-section">
                <h3>Display</h3>
                <div className="spec-item">
                  <span>Type:</span>
                  <span>{selectedProduct.specifications.display.type}</span>
                </div>
                <div className="spec-item">
                  <span>Resolution:</span>
                  <span>{selectedProduct.specifications.display.resolution}</span>
                </div>
                <div className="spec-item">
                  <span>Refresh Rate:</span>
                  <span>{selectedProduct.specifications.display.refreshRate}</span>
                </div>
                <div className="spec-item">
                  <span>Brightness:</span>
                  <span>{selectedProduct.specifications.display.brightness}</span>
                </div>
                <div className="spec-item">
                  <span>Field of View:</span>
                  <span>{selectedProduct.specifications.display.fov}</span>
                </div>
              </div>

              <div className="spec-section">
                <h3>Design</h3>
                <div className="spec-item">
                  <span>Weight:</span>
                  <span>{selectedProduct.specifications.design.weight}</span>
                </div>
                <div className="spec-item">
                  <span>Material:</span>
                  <span>{selectedProduct.specifications.design.material}</span>
                </div>
                <div className="spec-item">
                  <span>IPD Adjustment:</span>
                  <span>{selectedProduct.specifications.design.ipdAdjustment}</span>
                </div>
              </div>

              <div className="spec-section">
                <h3>Audio</h3>
                <div className="spec-item">
                  <span>Speakers:</span>
                  <span>{selectedProduct.specifications.audio.speakers}</span>
                </div>
                <div className="spec-item">
                  <span>Microphones:</span>
                  <span>{selectedProduct.specifications.audio.microphones}</span>
                </div>
              </div>

              <div className="spec-section">
                <h3>Connectivity</h3>
                <div className="spec-item">
                  <span>Connection:</span>
                  <span>{selectedProduct.specifications.connectivity.connection}</span>
                </div>
                <div className="spec-item">
                  <span>Compatibility:</span>
                  <span>{selectedProduct.specifications.connectivity.compatibility.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="features-list">
              <h3>Key Features</h3>
              <ul>
                {selectedProduct.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="product-description">{selectedProduct.description}</p>
            </div>
          )}

          {activeTab === 'pros-cons' && (
            <div className="pros-cons">
              <div className="pros">
                <h3>Pros</h3>
                <ul>
                  {selectedProduct.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <h3>Cons</h3>
                <ul>
                  {selectedProduct.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="company-info">
              <h3>{selectedProduct.brand}</h3>
              <div className="company-details">
                <div className="company-item">
                  <span>Founded:</span>
                  <span>{selectedProduct.companyInfo.founded}</span>
                </div>
                <div className="company-item">
                  <span>Headquarters:</span>
                  <span>{selectedProduct.companyInfo.headquarters}</span>
                </div>
                <div className="company-item">
                  <span>Employees:</span>
                  <span>{selectedProduct.companyInfo.employees}</span>
                </div>
                <div className="company-item">
                  <span>Market Share:</span>
                  <span>{selectedProduct.companyInfo.marketShare}</span>
                </div>
              </div>
              <p className="company-description">{selectedProduct.companyInfo.description}</p>
            </div>
          )}
        </div>
        </div>
      </div>
    )
  }

  // Comparison Page View
  if (currentView === 'comparison' && selectedProducts.length > 0) {
    return (
      <div className="app-container">
        <ComparisonCart />
        <header className="header">
          <div className="header-container">
            <div className="header-title">AR Compare - Comparison</div>
            <nav className="nav">
              <button onClick={goToMain} className="btn btn-outline">
                <ArrowLeft size={16} />
                Back to Products
              </button>
            </nav>
          </div>
        </header>

        <main className="comparison-main">
          <div className="comparison-container">
            {/* Comparison Header */}
            <div className="comparison-header">
              <div className="comparison-title-section">
                <h1 className="comparison-title">
                  <BarChart3 size={32} />
                  Compare AR Glasses
                </h1>
                <p className="comparison-subtitle">
                  Comparing {selectedProducts.length} AR glasses side-by-side
                </p>
              </div>

              {/* Controls */}
              <div className="comparison-controls">
                <div className="view-toggle">
                  <button
                    onClick={() => setComparisonView('grid')}
                    className={`view-btn ${comparisonView === 'grid' ? 'active' : ''}`}
                  >
                    <Grid3X3 size={16} />
                    Grid View
                  </button>
                  <button
                    onClick={() => setComparisonView('table')}
                    className={`view-btn ${comparisonView === 'table' ? 'active' : ''}`}
                  >
                    <BarChart3 size={16} />
                    Table View
                  </button>
                </div>

                <div className="sort-controls">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="brand">Sort by Brand</option>
                    <option value="fov">Sort by Field of View</option>
                    <option value="weight">Sort by Weight</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="sort-order-btn"
                  >
                    {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {comparisonView === 'grid' && (
              <div className="comparison-grid">
                {sortedSelectedProducts.map((product) => (
                  <div key={product.id} className="comparison-card">
                    <div className="comparison-card-header">
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="remove-btn"
                      >
                        <X size={16} />
                      </button>
                      <div className="product-category-badge">{product.category}</div>
                    </div>

                    <div className="comparison-card-content">
                      <h3 className="comparison-product-title">{product.fullName}</h3>
                      <div className="comparison-price">${product.price}</div>
                      
                      <div className="comparison-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`star ${i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="rating-value">{product.rating}</span>
                      </div>

                      {/* Key Specs Grid */}
                      <div className="comparison-specs">
                        <div className="spec-group">
                          <h4>Display</h4>
                          <div className="spec-row">
                            <span className="spec-label">Type:</span>
                            <span className="spec-value">{product.specifications.display.type}</span>
                          </div>
                          <div className="spec-row">
                            <span className="spec-label">Resolution:</span>
                            <span className="spec-value">{product.specifications.display.resolution}</span>
                          </div>
                          <div className="spec-row">
                            <span className="spec-label">FOV:</span>
                            <span className="spec-value">{product.specifications.display.fov}</span>
                          </div>
                          <div className="spec-row">
                            <span className="spec-label">Brightness:</span>
                            <span className="spec-value">{product.specifications.display.brightness}</span>
                          </div>
                        </div>

                        <div className="spec-group">
                          <h4>Design</h4>
                          <div className="spec-row">
                            <span className="spec-label">Weight:</span>
                            <span className="spec-value">{product.specifications.design.weight}</span>
                          </div>
                          <div className="spec-row">
                            <span className="spec-label">Material:</span>
                            <span className="spec-value">{product.specifications.design.material}</span>
                          </div>
                        </div>

                        <div className="spec-group">
                          <h4>Audio</h4>
                          <div className="spec-row">
                            <span className="spec-label">Speakers:</span>
                            <span className="spec-value">{product.specifications.audio.speakers}</span>
                          </div>
                        </div>

                        <div className="spec-group">
                          <h4>Connectivity</h4>
                          <div className="spec-row">
                            <span className="spec-label">Connection:</span>
                            <span className="spec-value">{product.specifications.connectivity.connection}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pros and Cons */}
                      <div className="comparison-pros-cons">
                        <div className="pros-section">
                          <h4 className="pros-title">
                            <Check size={16} />
                            Pros
                          </h4>
                          <ul className="pros-list">
                            {product.pros.slice(0, 3).map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="cons-section">
                          <h4 className="cons-title">
                            <Minus size={16} />
                            Cons
                          </h4>
                          <ul className="cons-list">
                            {product.cons.slice(0, 3).map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {comparisonView === 'table' && (
              <div className="comparison-table-container">
                <div className="comparison-table-scroll">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th className="spec-header">Specification</th>
                        {sortedSelectedProducts.map(product => (
                          <th key={product.id} className="product-header">
                            <div className="product-header-content">
                              <button
                                onClick={() => removeFromComparison(product.id)}
                                className="remove-btn-small"
                              >
                                <X size={14} />
                              </button>
                              <div className="product-info">
                                <div className="product-name">{product.fullName}</div>
                                <div className="product-price">${product.price}</div>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="spec-name">Rating</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            <div className="rating-cell">
                              <span className="rating-number">{product.rating}</span>
                              <div className="stars-small">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`star-small ${i < Math.floor(product.rating) ? 'filled' : 'empty'}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Category</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            <span className="category-badge">{product.category}</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Display Type</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.display.type}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Resolution</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.display.resolution}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Field of View</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            <span className="highlight-value">{product.specifications.display.fov}</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Brightness</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.display.brightness}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Refresh Rate</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.display.refreshRate}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Weight</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            <span className="highlight-value">{product.specifications.design.weight}</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Material</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.design.material}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Audio</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.audio.speakers}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="spec-name">Connection</td>
                        {sortedSelectedProducts.map(product => (
                          <td key={product.id} className="spec-value-cell">
                            {product.specifications.connectivity.connection}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  // Main View
  return (
    <div className="app-container">
      <ComparisonCart />
      <header className="header">
        <div className="header-container">
          <div className="header-title">AR Compare</div>
          <nav className="nav">
            <a href="#products">Products</a>
            <a href="#brands">Brands</a>
            <a href="#reviews">Reviews</a>
            <a href="#news">News</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-container">
            <h1 className="hero-title">The Ultimate AR & AI Glasses Comparison</h1>
            <p className="hero-subtitle">Compare specs, features, and prices of the latest AR glasses from top manufacturers. Make informed decisions with our comprehensive database.</p>
            
            <div className="hero-buttons">
              <button className="btn btn-primary">Start Comparing</button>
              <button className="btn btn-outline">View All Products</button>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-number">8+</div>
                <div className="stat-label">Brands</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat">
                <div className="stat-number">Daily</div>
                <div className="stat-label">Updates</div>
              </div>
            </div>
          </div>
        </section>

        <section className="products-section">
          <div className="products-container">
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

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <div className="product-icon">
                      {product.category === 'Premium' && '⚡'}
                      {product.category === 'Mid-range' && '⚡'}
                      {product.category === 'Budget' && '💰'}
                      {product.category === 'Gaming' && '🎮'}
                      {product.category === 'Professional' && '💼'}
                      {product.category === 'Everyday' && '👓'}
                      {product.category === 'Developer' && '🔧'}
                      {product.category === 'Specialized' && '🎯'}
                    </div>
                    <span style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)'}}>{product.category}</span>
                  </div>
                  
                  <h3 className="product-title">{product.fullName}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-price">
                    ${product.price}
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span style={{textDecoration: 'line-through', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', marginLeft: '0.5rem'}}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="rating-text">
                      {product.rating}
                    </span>
                    <span className="rating-reviews">
                      ({product.specifications?.reviews || 'No reviews yet'})
                    </span>
                  </div>

                  <div className="specs-grid">
                    <div className="spec-item">
                      <Eye size={14} />
                      <span>{product.specifications.display.fov}</span>
                    </div>
                    <div className="spec-item">
                      <Zap size={14} />
                      <span>{product.specifications.display.brightness}</span>
                    </div>
                    <div className="spec-item">
                      <Volume2 size={14} />
                      <span>{product.specifications.audio.speakers}</span>
                    </div>
                    <div className="spec-item">
                      <Weight size={14} />
                      <span>{product.specifications.design.weight}</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button
                      onClick={() => toggleProductSelection(product.id)}
                      className={`action-btn action-btn-compare ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                    >
                      {selectedProducts.includes(product.id) ? '✓ Added' : '+Compare'}
                    </button>
                    <button
                      onClick={() => showProductDetails(product)}
                      className="action-btn action-btn-details"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App


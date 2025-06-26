import { useState } from 'react'
import { Search, Star, Eye, Zap, Volume2, Weight, Smartphone, Cpu, ArrowLeft } from 'lucide-react'
import { arGlassesData } from './data/products.js'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('specs')

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
      } else if (prev.length < 3) {
        return [...prev, productId]
      }
      return prev
    })
  }

  const showProductDetails = (product) => {
    setSelectedProduct(product)
  }

  const closeProductDetails = () => {
    setSelectedProduct(null)
    setActiveTab('specs')
  }

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id))

  if (selectedProduct) {
    return (
      <div className="product-details">
        <div className="product-details-header">
          <button onClick={closeProductDetails} className="back-button">
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
    )
  }

  return (
    <div className="app-container">
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

            {selectedProducts.length > 0 && (
              <div className="comparison-section">
                <h3>Compare Selected Products ({selectedProducts.length}/3)</h3>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Specification</th>
                        {selectedProductsData.map(product => (
                          <th key={product.id}>{product.fullName}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>${product.price}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Display Type</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>{product.specifications.display.type}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Resolution</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>{product.specifications.display.resolution}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Field of View</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>{product.specifications.display.fov}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Brightness</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>{product.specifications.display.brightness}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Weight</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>{product.specifications.design.weight}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Audio</td>
                        {selectedProductsData.map(product => (
                          <td key={product.id}>{product.specifications.audio.speakers}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App


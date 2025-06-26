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
    <div className="app">
      <header className="header">
        <div className="nav">
          <div className="logo">AR Compare</div>
          <div className="nav-links">
            <a href="#products">Products</a>
            <a href="#brands">Brands</a>
            <a href="#reviews">Reviews</a>
            <a href="#news">News</a>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <h1>The Ultimate AR & AI Glasses Comparison</h1>
            <p>Compare specs, features, and prices of the latest AR glasses from top manufacturers. Make informed decisions with our comprehensive database.</p>
            
            <div className="hero-buttons">
              <button className="cta-button">Start Comparing</button>
              <button className="secondary-button">View All Products</button>
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
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search AR glasses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="products-header">
            <h2>{filteredProducts.length} Products Found</h2>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="product-badge">{product.category}</div>
                  <div className="product-icons">
                    <Eye size={16} />
                    <Zap size={16} />
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.fullName}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-price">
                    <span className="price">${product.price}</span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.specifications?.reviews || 'No reviews yet'})
                    </span>
                  </div>

                  <div className="product-specs">
                    <div className="spec">
                      <Eye size={16} />
                      <span>{product.specifications.display.fov}</span>
                    </div>
                    <div className="spec">
                      <Zap size={16} />
                      <span>{product.specifications.display.brightness}</span>
                    </div>
                    <div className="spec">
                      <Volume2 size={16} />
                      <span>{product.specifications.audio.speakers}</span>
                    </div>
                    <div className="spec">
                      <Weight size={16} />
                      <span>{product.specifications.design.weight}</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button
                      onClick={() => toggleProductSelection(product.id)}
                      className={`compare-button ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                    >
                      {selectedProducts.includes(product.id) ? '✓ Added' : '+Compare'}
                    </button>
                    <button
                      onClick={() => showProductDetails(product)}
                      className="details-button"
                    >
                      View Details
                    </button>
                  </div>
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
        </section>
      </main>
    </div>
  )
}

export default App


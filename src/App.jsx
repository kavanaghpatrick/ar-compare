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
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">AR Compare</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white text-opacity-80 hover:text-white">Products</a>
              <a href="#" className="text-white text-opacity-80 hover:text-white">Brands</a>
              <a href="#" className="text-white text-opacity-80 hover:text-white">Reviews</a>
              <a href="#" className="text-white text-opacity-80 hover:text-white">News</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            The Ultimate AR & AI Glasses Comparison
          </h1>
          <p className="text-xl text-white text-opacity-80 mb-8">
            Compare specs, features, and prices of the latest AR glasses from top manufacturers. 
            Make informed decisions with our comprehensive database.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              Start Comparing
            </button>
            <button className="border border-white border-opacity-20 text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-lg font-semibold">
              View All Products
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl font-bold text-white">4+</div>
              <div className="text-white text-opacity-60">Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">6+</div>
              <div className="text-white text-opacity-60">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Daily</div>
              <div className="text-white text-opacity-60">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search AR glasses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">{filteredProducts.length} Products Found</h2>
          
          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">👓</div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-white text-opacity-80 mb-3">{product.description}</p>
                <div className="text-2xl font-bold text-blue-400 mb-4">{product.price}</div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {product.rating > 0 ? (
                    <>
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-white font-semibold">{product.rating}</span>
                      <span className="text-white text-opacity-60">({product.reviews} reviews)</span>
                    </>
                  ) : (
                    <span className="text-white text-opacity-60">No rating yet ({product.reviews} reviews)</span>
                  )}
                </div>
                
                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="text-white text-opacity-80">
                    👁️ {product.fieldOfView}
                  </div>
                  <div className="text-white text-opacity-80">
                    ⚡ {product.brightness}
                  </div>
                  <div className="text-white text-opacity-80">
                    🔊 {product.audio}
                  </div>
                  <div className="text-white text-opacity-80">
                    ⚖️ {product.weight}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                    +Compare
                  </button>
                  <button className="flex-1 border border-white border-opacity-20 text-white hover:bg-white hover:bg-opacity-10 py-2 px-4 rounded-lg text-sm font-semibold">
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


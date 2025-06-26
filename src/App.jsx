import { useState, useMemo } from 'react'
import { Search, Filter, Star, ArrowRight, Zap, Eye, Headphones, Smartphone, ChevronDown, Check, X } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { arGlassesData, brands, categories, comparisonFeatures } from './data/products'
import './App.css'

function App() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [currentView, setCurrentView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    return arGlassesData.filter(product => {
      const matchesSearch = product.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory
      const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase()
      
      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [searchTerm, selectedCategory, selectedBrand])

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

  const getSelectedProductsData = () => {
    return selectedProducts.map(id => arGlassesData.find(p => p.id === id))
  }

  const renderStars = (rating) => {
    if (!rating) return <span className="text-gray-400">No rating yet</span>
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    )
  }

  const ProductCard = ({ product, isSelected, onToggle, onView }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant={product.availability === 'Available' ? 'default' : 'secondary'} className="mb-2">
              {product.availability}
            </Badge>
            <CardTitle className="text-lg">{product.fullName}</CardTitle>
            <CardDescription className="text-sm">{product.description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              ${product.price}
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">{product.currency}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-6xl opacity-20">👓</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-blue-500" />
              <span>{product.specifications.display.fov}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>{product.specifications.display.brightness}</span>
            </div>
            <div className="flex items-center gap-1">
              <Headphones className="w-4 h-4 text-green-500" />
              <span>{product.specifications.audio.speakers}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">⚖️</span>
              <span>{product.specifications.design.weight}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.keyFeatures.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onToggle(product.id)}
              className="flex-1"
            >
              {isSelected ? <Check className="w-4 h-4 mr-1" /> : '+'} 
              {isSelected ? 'Selected' : 'Compare'}
            </Button>
            <Button 
              size="sm" 
              onClick={() => onView(product)}
              className="flex-1"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ComparisonTable = () => {
    const selectedProductsData = getSelectedProductsData()
    
    if (selectedProductsData.length === 0) {
      return (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">No products selected</h3>
            <p>Select 2-3 products from the list above to compare their specifications</p>
          </div>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Product Comparison</CardTitle>
          <CardDescription>
            Comparing {selectedProductsData.length} product{selectedProductsData.length > 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Feature</th>
                  {selectedProductsData.map(product => (
                    <th key={product.id} className="text-left p-3 min-w-[200px]">
                      <div>
                        <div className="font-semibold">{product.fullName}</div>
                        <div className="text-sm text-gray-500">${product.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map(feature => (
                  <tr key={feature.key} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{feature.label}</td>
                    {selectedProductsData.map(product => {
                      const value = feature.key.split('.').reduce((obj, key) => obj?.[key], product)
                      return (
                        <td key={product.id} className="p-3">
                          {feature.type === 'currency' ? `$${value}` :
                           feature.type === 'rating' ? renderStars(value) :
                           value || 'N/A'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ProductDetail = ({ product }) => (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={() => setCurrentView('home')}
        className="mb-4"
      >
        ← Back to Products
      </Button>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center mb-6">
            <div className="text-9xl opacity-30">👓</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{product.specifications.display.fov}</div>
              <div className="text-sm text-gray-600">Field of View</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{product.specifications.display.brightness}</div>
              <div className="text-sm text-gray-600">Brightness</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{product.specifications.design.weight}</div>
              <div className="text-sm text-gray-600">Weight</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">${product.price}</div>
              <div className="text-sm text-gray-600">Price</div>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.fullName}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <Badge variant={product.availability === 'Available' ? 'default' : 'secondary'}>
                {product.availability}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                ${product.price}
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice}</span>
                )}
              </div>
              {renderStars(product.rating)}
            </div>
          </div>

          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Display</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{product.specifications.display.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="font-medium">{product.specifications.display.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refresh Rate:</span>
                    <span className="font-medium">{product.specifications.display.refreshRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brightness:</span>
                    <span className="font-medium">{product.specifications.display.brightness}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-medium">{product.specifications.design.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span className="font-medium">{product.specifications.design.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IPD Adjustment:</span>
                    <span className="font-medium">{product.specifications.design.ipdAdjustment}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {product.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pros-cons">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {product.pros.map((pro, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {product.cons.map((con, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-500 mt-0.5" />
                          <span className="text-sm">{con}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Founded:</span>
                    <span className="font-medium">{product.company.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{product.company.location}</span>
                  </div>
                  {product.company.marketShare && (
                    <div className="flex justify-between">
                      <span>Market Share:</span>
                      <span className="font-medium">{product.company.marketShare}</span>
                    </div>
                  )}
                  {product.company.unitsSold && (
                    <div className="flex justify-between">
                      <span>Units Sold:</span>
                      <span className="font-medium">{product.company.unitsSold}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )

  if (currentView === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ProductDetail product={selectedProduct} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">AR Compare</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Brands</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Reviews</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">News</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                The Ultimate AR & AI Glasses Comparison
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Compare specs, features, and prices of the latest AR glasses from top manufacturers. 
                Make informed decisions with our comprehensive database.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  Start Comparing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  View All Products
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-8 text-blue-100">
                <div>
                  <div className="text-2xl font-bold text-white">{brands.length}+</div>
                  <div className="text-sm">Brands</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{arGlassesData.length}+</div>
                  <div className="text-sm">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Daily</div>
                  <div className="text-sm">Updates</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/hero-image.png" 
                alt="AR Glasses Comparison" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search AR glasses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand.id} value={brand.name.toLowerCase()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProducts.length > 0 && (
              <Button 
                variant="outline"
                onClick={() => setSelectedProducts([])}
              >
                Clear Selection ({selectedProducts.length})
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
            </h3>
            <p className="text-gray-600">
              {selectedProducts.length > 0 && `${selectedProducts.length} selected for comparison`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onToggle={toggleProductSelection}
                onView={(product) => {
                  setSelectedProduct(product)
                  setCurrentView('product')
                }}
              />
            ))}
          </div>

          {/* Comparison Section */}
          {selectedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Product Comparison</h3>
              <ComparisonTable />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AR</span>
                </div>
                <h3 className="text-xl font-bold">AR Compare</h3>
              </div>
              <p className="text-gray-400">
                The ultimate destination for AR and AI glasses comparison and reviews.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">All Glasses</a></li>
                <li><a href="#" className="hover:text-white">Budget Options</a></li>
                <li><a href="#" className="hover:text-white">Premium Models</a></li>
                <li><a href="#" className="hover:text-white">Latest Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Brands</h4>
              <ul className="space-y-2 text-gray-400">
                {brands.map(brand => (
                  <li key={brand.id}>
                    <a href="#" className="hover:text-white">{brand.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Buying Guide</a></li>
                <li><a href="#" className="hover:text-white">Reviews</a></li>
                <li><a href="#" className="hover:text-white">News</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AR Compare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


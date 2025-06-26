import { useState, useMemo } from 'react'
import { Search, Star, Eye, Zap, Volume2, Weight, Smartphone, Cpu, ArrowLeft } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { arGlassesData } from './data/products'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [comparisonList, setComparisonList] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    return arGlassesData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand
      return matchesSearch && matchesBrand
    })
  }, [searchTerm, selectedBrand])

  const brands = ['All Brands', ...new Set(arGlassesData.map(p => p.brand))]

  const toggleComparison = (product) => {
    setComparisonList(prev => {
      const isSelected = prev.find(p => p.id === product.id)
      if (isSelected) {
        return prev.filter(p => p.id !== product.id)
      } else if (prev.length < 3) {
        return [...prev, product]
      }
      return prev
    })
  }

  const isInComparison = (productId) => {
    return comparisonList.find(p => p.id === productId)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setSelectedProduct(null)}
            className="mb-6 bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-6xl mb-4">👓</div>
                <div className="space-y-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{selectedProduct.specs.fieldOfView}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{selectedProduct.specs.brightness}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <span>{selectedProduct.specs.audio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    <span>{selectedProduct.specs.weight}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{selectedProduct.name}</h1>
                <p className="text-xl text-white/80 mb-4">{selectedProduct.description}</p>
                <div className="text-3xl font-bold text-blue-400 mb-4">{selectedProduct.price}</div>
                
                {selectedProduct.status && (
                  <Badge className="mb-4 bg-orange-500">{selectedProduct.status}</Badge>
                )}
                
                <div className="flex items-center gap-2 mb-6">
                  {selectedProduct.rating > 0 ? (
                    <>
                      <div className="flex">{renderStars(selectedProduct.rating)}</div>
                      <span className="text-white font-semibold">{selectedProduct.rating}</span>
                      <span className="text-white/60">({selectedProduct.reviews} reviews)</span>
                    </>
                  ) : (
                    <span className="text-white/60">No rating yet ({selectedProduct.reviews} reviews)</span>
                  )}
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="specs" className="mt-8">
              <TabsList className="grid w-full grid-cols-4 bg-white/10">
                <TabsTrigger value="specs" className="text-white data-[state=active]:bg-blue-600">Specs</TabsTrigger>
                <TabsTrigger value="features" className="text-white data-[state=active]:bg-blue-600">Features</TabsTrigger>
                <TabsTrigger value="pros-cons" className="text-white data-[state=active]:bg-blue-600">Pros & Cons</TabsTrigger>
                <TabsTrigger value="company" className="text-white data-[state=active]:bg-blue-600">Company</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6 text-white">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Display</h3>
                    <div className="space-y-2 text-white/80">
                      <div>Type: {selectedProduct.specs.displayType}</div>
                      <div>Resolution: {selectedProduct.specs.resolution}</div>
                      <div>Refresh Rate: {selectedProduct.specs.refreshRate}</div>
                      <div>Brightness: {selectedProduct.specs.brightness}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Design</h3>
                    <div className="space-y-2 text-white/80">
                      <div>Weight: {selectedProduct.specs.weight}</div>
                      <div>Material: {selectedProduct.specs.material}</div>
                      <div>IPD Adjustment: {selectedProduct.specs.ipdAdjustment}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pros-cons" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-400">Pros</h3>
                    <div className="space-y-2">
                      {selectedProduct.pros.map((pro, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white/80">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-red-400">Cons</h3>
                    <div className="space-y-2">
                      {selectedProduct.cons.map((con, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-white/80">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="company" className="mt-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-4">Company Information</h3>
                  <div className="space-y-4 text-white/80">
                    <div>
                      <strong>Founded:</strong> {selectedProduct.company.founded}
                    </div>
                    <div>
                      <strong>Headquarters:</strong> {selectedProduct.company.headquarters}
                    </div>
                    <div>
                      <strong>About:</strong> {selectedProduct.company.description}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white">AR Compare</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-white/80 hover:text-white transition-colors">Products</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Brands</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Reviews</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">News</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            The Ultimate AR & AI Glasses Comparison
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Compare specs, features, and prices of the latest AR glasses from top manufacturers. 
            Make informed decisions with our comprehensive database.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Comparing
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              View All Products
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4+</div>
              <div className="text-white/60">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6+</div>
              <div className="text-white/60">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Daily</div>
              <div className="text-white/60">Updates</div>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
          <img 
            src="/hero-image.png" 
            alt="AR Glasses Comparison" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Search AR glasses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'All Products' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('All Products')}
                className="bg-blue-600 hover:bg-blue-700 border-white/20"
              >
                All Products ({arGlassesData.length})
              </Button>
              {brands.map(brand => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? 'default' : 'outline'}
                  onClick={() => setSelectedBrand(brand)}
                  className="bg-blue-600 hover:bg-blue-700 border-white/20"
                >
                  {brand}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">{filteredProducts.length} Products Found</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">👓</div>
                      {product.status && (
                        <Badge className="bg-orange-500">{product.status}</Badge>
                      )}
                    </div>
                    <CardTitle className="text-white">{product.name}</CardTitle>
                    <CardDescription className="text-white/80">{product.description}</CardDescription>
                    <div className="text-2xl font-bold text-blue-400">{product.price}</div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        {product.rating > 0 ? (
                          <>
                            <div className="flex">{renderStars(product.rating)}</div>
                            <span className="text-white font-semibold">{product.rating}</span>
                            <span className="text-white/60">({product.reviews} reviews)</span>
                          </>
                        ) : (
                          <span className="text-white/60">No rating yet ({product.reviews} reviews)</span>
                        )}
                      </div>
                      
                      {/* Key Specs */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-white/80">
                          <Eye className="w-3 h-3" />
                          <span>{product.specs.fieldOfView}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/80">
                          <Zap className="w-3 h-3" />
                          <span>{product.specs.brightness}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/80">
                          <Volume2 className="w-3 h-3" />
                          <span>{product.specs.audio}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/80">
                          <Weight className="w-3 h-3" />
                          <span>{product.specs.weight}</span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-blue-600/20 text-blue-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant={isInComparison(product.id) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => toggleComparison(product)}
                          className="flex-1 bg-green-600 hover:bg-green-700 border-white/20"
                        >
                          {isInComparison(product.id) ? '✓ Selected' : '+Compare'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                          className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {comparisonList.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Product Comparison</h2>
              <p className="text-white/80 mb-6">Comparing {comparisonList.length} products</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      {comparisonList.map(product => (
                        <th key={product.id} className="text-center py-3 px-4 font-semibold">
                          {product.name}<br />
                          <span className="text-blue-400 font-bold">{product.price}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Price</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.price}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Resolution</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.resolution}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Brightness</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.brightness}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Field of View</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.fieldOfView}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Refresh Rate</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.refreshRate}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Weight</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.weight}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Audio</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.audio}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Connection</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.connection}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-medium">Tracking</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">{product.specs.tracking}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Rating</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="py-3 px-4 text-center">
                          <div className="flex justify-center items-center gap-1">
                            {renderStars(product.rating)}
                            <span className="ml-1">{product.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default App


import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Glasses, Cpu, Eye, Zap, Star, ArrowRight } from 'lucide-react'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const featuredProducts = [
    {
      name: "Meta Orion",
      company: "Meta",
      category: "AR",
      price: "TBA",
      features: ["Holographic Display", "Neural Interface", "Hand Tracking"],
      status: "Coming 2025",
      rating: 5
    },
    {
      name: "Xreal Air 2 Ultra",
      company: "Xreal",
      category: "AR",
      price: "$699",
      features: ["6DOF Tracking", "120Hz Display", "Spatial Computing"],
      status: "Available",
      rating: 4.5
    },
    {
      name: "Ray-Ban Meta",
      company: "Meta",
      category: "AI",
      price: "$299",
      features: ["AI Assistant", "Camera", "Audio"],
      status: "Available",
      rating: 4.2
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Glasses className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">AR Compare</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Products</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">News</a>
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Coming Soon
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            The Ultimate AR & AI Glasses Comparison
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare the latest AR and AI glasses from top manufacturers. Find the perfect smart eyewear for your needs with detailed specs, reviews, and real-world testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Read Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why AR Compare?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Cpu className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Comprehensive Specs</CardTitle>
                <CardDescription>
                  Detailed technical specifications, performance metrics, and compatibility information for every device.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real-World Testing</CardTitle>
                <CardDescription>
                  Hands-on reviews and testing in real-world scenarios to help you make informed decisions.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Latest Updates</CardTitle>
                <CardDescription>
                  Stay up-to-date with the newest releases, software updates, and industry developments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ar">AR Glasses</TabsTrigger>
              <TabsTrigger value="ai">AI Glasses</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{product.company}</CardDescription>
                        </div>
                        <Badge variant={product.category === 'AR' ? 'default' : 'secondary'}>
                          {product.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg">{product.price}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="pt-2">
                          <Badge variant={product.status === 'Available' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect AR Glasses?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust AR Compare for their smart eyewear decisions.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 AR Compare. The ultimate resource for AR and AI glasses comparison.</p>
          <p className="mt-2 text-sm">Built with React, Tailwind CSS, and modern web technologies.</p>
        </div>
      </footer>
    </div>
  )
}

export default App


import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] relative">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#333333] mb-6">
              About TransportX
            </h1>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              Revolutionizing transportation with cutting-edge technology and seamless user experience
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#333333]">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666] text-lg leading-relaxed">
                TransportX is designed to transform the way people think about transportation. 
                We combine real-time analytics, AI-powered route optimization, and seamless booking 
                to create a transportation experience that's not just efficient, but truly revolutionary.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#FF6B00]">🚀 Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#666666]">
                  Advanced analytics provide insights into transportation patterns, helping optimize routes and reduce wait times.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#FF6B00]">🤖 AI-Powered Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#666666]">
                  Machine learning algorithms optimize routes in real-time, ensuring the fastest and most efficient journeys.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#FF6B00]">📱 Seamless Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#666666]">
                  Intuitive interface makes booking rides as simple as a few taps, with instant confirmation and tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#FF6B00]">🔒 Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#666666]">
                  Enterprise-grade security ensures your data and payments are always protected and transactions are reliable.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Developer Section */}
          <Card className="bg-gradient-to-r from-[#FF6B00]/5 to-[#4A90E2]/5 border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#333333]">Developed By</CardTitle>
              <CardDescription className="text-[#666666]">
                Meet the developer behind TransportX
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-[#4A90E2] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  HS
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#333333]">Harshita Singh</h3>
                  <p className="text-[#666666]">B.Tech Computer Science Final Year Student</p>
                  <p className="text-[#999999]">Vellore Institute of Technology, Andhra Pradesh</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-[#666666] leading-relaxed">
                  A passionate developer with expertise in modern web technologies, 
                  Harshita has created TransportX as a showcase of cutting-edge 
                  development practices and innovative user experience design.
                </p>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    asChild 
                    className="bg-[#FF6B00] hover:bg-[#E55A00] text-white"
                  >
                    <a 
                      href="https://github.com/manno198" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Github className="w-5 h-5" />
                      <span>View on GitHub</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card className="mt-8 bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#333333]">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#FF6B00]/10 rounded-lg border border-[#FF6B00]/20">
                  <div className="text-[#FF6B00] font-semibold">Next.js 15</div>
                  <div className="text-[#666666] text-sm">React Framework</div>
                </div>
                <div className="text-center p-4 bg-[#4A90E2]/10 rounded-lg border border-[#4A90E2]/20">
                  <div className="text-[#4A90E2] font-semibold">TypeScript</div>
                  <div className="text-[#666666] text-sm">Type Safety</div>
                </div>
                <div className="text-center p-4 bg-[#FF6B00]/10 rounded-lg border border-[#FF6B00]/20">
                  <div className="text-[#FF6B00] font-semibold">Supabase</div>
                  <div className="text-[#666666] text-sm">Backend & Database</div>
                </div>
                <div className="text-center p-4 bg-[#4A90E2]/10 rounded-lg border border-[#4A90E2]/20">
                  <div className="text-[#4A90E2] font-semibold">Tailwind CSS</div>
                  <div className="text-[#666666] text-sm">Styling</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
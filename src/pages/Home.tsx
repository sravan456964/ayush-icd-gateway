import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Globe, Database, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";

export const Home = () => {
  const features = [
    {
      icon: Database,
      title: "NAMASTE Integration",
      description: "Seamless mapping of Ayush terminologies to ICD-11 standards"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "AI-powered autocomplete for precise term matching"
    },
    {
      icon: Shield,
      title: "ABHA Ready",
      description: "Secure authentication and provenance tracking"
    },
    {
      icon: Globe,
      title: "FHIR Compatible",
      description: "Standard healthcare data format support"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Smart India Hackathon 2025
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Ayush ↔ ICD-11
                <span className="block text-primary">Integration Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Bridging traditional medicine with modern healthcare standards through 
                intelligent API integration for Indian EHR systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-hero border-0 shadow-government hover:shadow-glow transition-all duration-300"
                  asChild
                >
                  <Link to="/demo">
                    Explore Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <Link to="/docs">
                    <FileText className="mr-2 h-4 w-4" />
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Ayurveda and ICD-11 Integration Illustration" 
                  className="w-full h-auto rounded-2xl shadow-card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technology stack designed for seamless integration 
              between traditional Ayurveda and modern healthcare systems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:shadow-card transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-government">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-government-foreground mb-6">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-xl text-government-foreground/90 mb-8">
            Join us in revolutionizing the integration between traditional Ayurveda 
            and modern healthcare standards for a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-background text-foreground hover:bg-muted"
              asChild
            >
              <Link to="/about">Learn More About Our Mission</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-government-foreground/20 text-government-foreground hover:bg-government-foreground/10"
              asChild
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
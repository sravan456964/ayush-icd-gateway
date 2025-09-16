import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Search, 
  Shield, 
  Globe, 
  Zap, 
  FileText, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const Features = () => {
  const mainFeatures = [
    {
      icon: Database,
      title: "NAMASTE → ICD-11 Mapping",
      description: "Intelligent terminology mapping between traditional Ayurveda (NAMASTE) and international healthcare standards (ICD-11)",
      details: [
        "Automated term recognition and matching",
        "Contextual mapping with confidence scores",
        "Bidirectional translation support",
        "Real-time validation and verification"
      ],
      badge: "Core Feature"
    },
    {
      icon: Search,
      title: "Autocomplete Search Engine",
      description: "Advanced search functionality with AI-powered suggestions for precise term matching",
      details: [
        "Fuzzy search with typo tolerance",
        "Multi-language support (Hindi, Sanskrit, English)",
        "Contextual suggestions based on medical domain",
        "Search history and favorites"
      ],
      badge: "AI-Powered"
    },
    {
      icon: Globe,
      title: "FHIR-Ready Integration",
      description: "Seamless integration with Fast Healthcare Interoperability Resources (FHIR) standards",
      details: [
        "FHIR R4 compliant data structures",
        "Standard healthcare data exchange formats",
        "Terminology server capabilities",
        "RESTful API endpoints"
      ],
      badge: "Standard Compliant"
    },
    {
      icon: Shield,
      title: "ABHA-Ready Authentication",
      description: "Secure authentication system compatible with Ayushman Bharat Health Account (ABHA)",
      details: [
        "OAuth 2.0 authentication flow",
        "ABHA ID integration support",
        "Role-based access control",
        "Audit trail and provenance tracking"
      ],
      badge: "Government Ready"
    }
  ];

  const technicalSpecs = [
    {
      icon: Zap,
      title: "High Performance",
      specs: ["Sub-100ms API response time", "99.9% uptime guarantee", "Auto-scaling infrastructure"]
    },
    {
      icon: FileText,
      title: "Comprehensive Documentation",
      specs: ["Interactive API docs", "Code samples in multiple languages", "Postman collections"]
    },
    {
      icon: Clock,
      title: "Real-time Synchronization",
      specs: ["Live data updates", "Webhook notifications", "Change tracking"]
    },
    {
      icon: Users,
      title: "Multi-user Support",
      specs: ["Organization management", "Team collaboration", "Permission controls"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Platform Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive suite of features designed to bridge traditional Ayurveda 
            with modern healthcare standards through intelligent API integration.
          </p>
        </div>

        {/* Main Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Core Capabilities
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-border hover:shadow-card transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Technical Excellence
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with enterprise-grade reliability and government compliance standards
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <Card key={index} className="border-border hover:shadow-card transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{spec.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {spec.specs.map((item, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {item}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Integration Flow */}
        <section className="bg-gradient-subtle rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple 3-step integration process for healthcare systems
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Input Ayush Term",
                description: "Healthcare providers input traditional Ayurveda terminology through our search interface"
              },
              {
                step: "02", 
                title: "AI Mapping Process",
                description: "Our AI engine processes the term and finds the most accurate ICD-11 equivalent with confidence scoring"
              },
              {
                step: "03",
                title: "FHIR Export",
                description: "Mapped data is formatted according to FHIR standards and integrated into existing EHR systems"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-primary mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
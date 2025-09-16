import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Play, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  ArrowRight,
  Code,
  Database
} from "lucide-react";

export const Demo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const mockResults = [
    {
      ayushTerm: "कफ दोष",
      englishTerm: "Kapha Dosha",
      icd11Code: "XA7J20",
      icd11Description: "Disorders of constitutional type - Kapha predominant",
      confidence: 95,
      category: "Constitutional Disorders"
    },
    {
      ayushTerm: "अमलपित्त",
      englishTerm: "Amlapitta",
      icd11Code: "DA60.0",
      icd11Description: "Gastro-oesophageal reflux disease",
      confidence: 88,
      category: "Digestive Disorders"
    },
    {
      ayushTerm: "प्राणवायु",
      englishTerm: "Prana Vayu", 
      icd11Code: "MD11.0",
      icd11Description: "Disorders of respiratory function",
      confidence: 82,
      category: "Respiratory System"
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Interactive Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience the power of our Ayush ↔ ICD-11 integration platform. 
            Try searching for Ayurvedic terms and see real-time mappings to international standards.
          </p>
        </div>

        {/* Demo Interface */}
        <section className="mb-20">
          <Card className="max-w-4xl mx-auto border-border shadow-card">
            <CardHeader className="text-center bg-gradient-subtle">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Ayush Terminology Search
              </CardTitle>
              <p className="text-muted-foreground">
                Enter an Ayurvedic term in Hindi, Sanskrit, or English
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Search Input */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Try: कफ दोष, Amlapitta, or Prana Vayu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-lg h-12"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="px-8"
                  >
                    {isSearching ? "Searching..." : "Search"}
                    <Search className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Mock Results */}
                {(searchTerm || isSearching) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Search Results ({mockResults.length} matches found)
                    </h3>
                    <div className="space-y-3">
                      {mockResults.map((result, index) => (
                        <div 
                          key={index} 
                          className="border border-border rounded-lg p-4 hover:shadow-card transition-all duration-200 bg-card"
                        >
                          <div className="grid md:grid-cols-3 gap-4 items-center">
                            <div>
                              <div className="text-lg font-medium text-foreground">
                                {result.ayushTerm}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {result.englishTerm}
                              </div>
                              <Badge variant="outline" className="mt-1">
                                {result.category}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-center">
                              <ArrowRight className="w-6 h-6 text-primary" />
                            </div>
                            
                            <div>
                              <div className="font-mono text-sm text-government font-medium">
                                ICD-11: {result.icd11Code}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {result.icd11Description}
                              </div>
                              <div className="flex items-center mt-2">
                                <CheckCircle className="w-4 h-4 text-secondary mr-1" />
                                <span className="text-xs text-secondary font-medium">
                                  {result.confidence}% confidence
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Video Demo Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Watch Our Platform in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              See how healthcare professionals can seamlessly integrate traditional 
              Ayurvedic diagnoses with modern EHR systems
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto border-border">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-government rounded-t-lg flex items-center justify-center">
                <div className="text-center text-government-foreground">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Platform Walkthrough
                  </h3>
                  <p className="text-government-foreground/80">
                    3-minute demonstration video
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="mt-4 bg-background text-foreground hover:bg-muted"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Play Demo Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Try Sandbox */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Developer Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our API and integrate with your healthcare systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-card transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>API Sandbox</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Test our APIs directly in your browser with live data and examples
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Sandbox
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Sample Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Download sample datasets and mapping files for testing
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Samples
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-government/10 rounded-lg flex items-center justify-center mb-4">
                  <ExternalLink className="w-6 h-6 text-government" />
                </div>
                <CardTitle>GitHub Repository</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Access source code, documentation, and contribution guidelines
                </p>
                <Button variant="government" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
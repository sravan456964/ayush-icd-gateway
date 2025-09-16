import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Database, 
  Key, 
  FileText, 
  ExternalLink, 
  Copy, 
  CheckCircle,
  Globe,
  Shield
} from "lucide-react";

export const Documentation = () => {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/search",
      description: "Search Ayush terms and get ICD-11 mappings",
      params: ["q (query)", "lang (hi/sa/en)", "limit", "confidence_threshold"]
    },
    {
      method: "POST",
      path: "/api/v1/map",
      description: "Map a specific Ayush term to ICD-11",
      params: ["term", "context", "source_language", "target_system"]
    },
    {
      method: "GET",
      path: "/api/v1/fhir/terminology",
      description: "Get FHIR-compliant terminology resources",
      params: ["system", "version", "code", "display"]
    },
    {
      method: "POST", 
      path: "/api/v1/fhir/sync",
      description: "Sync mapped data to EHR system",
      params: ["patient_id", "encounter_id", "terminology_data"]
    }
  ];

  const codeExamples = {
    search: `// Search for Ayush terms
const response = await fetch('/api/v1/search?q=कफ दोष&lang=hi&limit=5');
const results = await response.json();

console.log(results);
/* Output:
{
  "matches": [
    {
      "ayush_term": "कफ दोष",
      "english_term": "Kapha Dosha", 
      "icd11_code": "XA7J20",
      "icd11_description": "Disorders of constitutional type - Kapha predominant",
      "confidence": 0.95,
      "category": "Constitutional Disorders"
    }
  ],
  "total": 1,
  "query_time_ms": 45
}
*/`,
    
    map: `// Map specific term
const response = await fetch('/api/v1/map', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    "term": "अमलपित्त",
    "context": "digestive disorder with hyperacidity",
    "source_language": "hi", 
    "target_system": "icd11"
  })
});

const mapping = await response.json();
/* Output:
{
  "mapping": {
    "source_term": "अमलपित्त",
    "target_code": "DA60.0",
    "target_description": "Gastro-oesophageal reflux disease",
    "confidence": 0.88,
    "provenance": {
      "mapped_by": "ai_engine_v2.1",
      "mapped_at": "2025-01-15T10:30:00Z",
      "reviewed": false
    }
  }
}
*/`,

    fhir: `// FHIR-compliant data export
const response = await fetch('/api/v1/fhir/terminology?system=ayush-icd11&code=XA7J20');
const fhirData = await response.json();

/* FHIR CodeSystem Response:
{
  "resourceType": "CodeSystem",
  "id": "ayush-icd11-mapping",
  "url": "https://ayush-icd11.gov.in/fhir/CodeSystem/terminology",
  "version": "1.0.0",
  "name": "AyushICD11Mapping",
  "title": "Ayush to ICD-11 Terminology Mapping",
  "status": "active",
  "concept": [
    {
      "code": "kapha-dosha-disorder",
      "display": "कफ दोष (Kapha Dosha)",
      "definition": "Constitutional disorder characterized by Kapha imbalance",
      "property": [
        {
          "code": "icd11-equivalent",
          "valueString": "XA7J20"
        }
      ]
    }
  ]
}
*/`
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive guide to integrating Ayush ↔ ICD-11 mapping capabilities 
            into your healthcare systems and EHR applications.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-20">
          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All API requests require authentication using your API key. Include it in the Authorization header:
              </p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="government">
                  <Key className="mr-2 h-4 w-4" />
                  Get API Key
                </Button>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  ABHA Compatible
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* API Endpoints */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              API Endpoints
            </h2>
            <p className="text-xl text-muted-foreground">
              RESTful APIs for terminology mapping and FHIR integration
            </p>
          </div>
          
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                        className="font-mono"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-medium">{endpoint.path}</code>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                  <div>
                    <h4 className="font-medium mb-2">Parameters:</h4>
                    <div className="flex flex-wrap gap-2">
                      {endpoint.params.map((param, idx) => (
                        <Badge key={idx} variant="outline" className="font-mono text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Code Examples
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-world implementation examples in JavaScript
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(codeExamples).map(([key, code], index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <CardTitle className="capitalize">{key} Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm">
                      <code>{code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Integration Guide */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              EHR Integration Guide
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-secondary" />
                  Data Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Capture Ayush terminology from clinical notes",
                    "Send to our API for ICD-11 mapping",
                    "Receive standardized codes with confidence scores",
                    "Store in EHR with provenance tracking",
                    "Export as FHIR resources for interoperability"
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-medium text-secondary">{idx + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-government" />
                  FHIR Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm">FHIR R4 CodeSystem resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm">ValueSet for Ayush terminologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm">ConceptMap for ICD-11 mappings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Provenance tracking support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Terminology server capabilities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Resources */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Developer Resources
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border text-center hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Postman Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Ready-to-use API collection with examples and test cases
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Download Collection
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>SDK Libraries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Official SDKs for Python, Java, Node.js, and .NET
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View SDKs
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-government/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-government" />
                </div>
                <CardTitle>Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Join our developer community for support and discussions
                </p>
                <Button variant="government" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
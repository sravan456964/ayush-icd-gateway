import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Database, Shield, Plus, UserPlus } from "lucide-react";
import { useTermSearch } from "@/hooks/useTermSearch";
import { usePatients } from "@/hooks/usePatients";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export const Demo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<any>(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  
  const { searchTerms, results, loading: searchLoading } = useTermSearch();
  const { createPatient, fetchPatients, patients, loading: patientLoading } = usePatients();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchTerms(searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSelectTerm = (term: any) => {
    setSelectedTerm(term);
    setDiagnosis(term.local_name);
  };

  const handleSavePatient = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save patient records",
        variant: "destructive"
      });
      return;
    }

    if (!patientName || !patientAge || !selectedTerm) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and select a term",
        variant: "destructive"
      });
      return;
    }

    const { data, error } = await createPatient({
      name: patientName,
      age: parseInt(patientAge),
      diagnosis,
      namaste_code: selectedTerm.namaste_code,
      icd_code: selectedTerm.icd_code
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save patient record",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Patient record saved successfully"
      });
      // Reset form
      setPatientName("");
      setPatientAge("");
      setDiagnosis("");
      setSelectedTerm(null);
      fetchPatients();
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to access the interactive demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Interactive Demo
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience real-time NAMASTE to ICD-11 mapping with our live demonstration platform
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Live Search Demo */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Live Search Interface
            </CardTitle>
            <CardDescription>
              Type any Ayurvedic term to see ICD-11 mappings in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Try typing: Jwara, Prameha, Kasa..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Search Results */}
            <div className="space-y-3 bg-secondary/30 p-4 rounded-lg max-h-80 overflow-y-auto">
              {searchLoading ? (
                <div className="text-center text-muted-foreground">Searching...</div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Search Results:</div>
                  {results.map((term) => (
                    <div 
                      key={term.id}
                      className="flex items-center justify-between p-2 bg-background rounded border cursor-pointer hover:bg-secondary/50"
                      onClick={() => handleSelectTerm(term)}
                    >
                      <div>
                        <div className="font-medium">{term.local_name}</div>
                        <div className="text-sm text-muted-foreground">{term.description}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{term.namaste_code}</Badge>
                        <Badge className="ml-2">{term.icd_code}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center text-muted-foreground">No results found</div>
              ) : (
                <div className="text-sm text-muted-foreground">Start typing to search for terms...</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Patient Record Demo */}
        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-secondary" />
              Patient Record System
            </CardTitle>
            <CardDescription>
              Save diagnoses with dual NAMASTE + ICD-11 coding for EMR integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input 
                placeholder="Patient Name" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              <Input 
                placeholder="Age" 
                type="number" 
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
              />
            </div>
            <Input 
              placeholder="Diagnosis" 
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            
            {selectedTerm && (
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground mb-2">Selected Mapping:</div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{selectedTerm.local_name} → {diagnosis}</div>
                    <div className="text-sm text-muted-foreground">FHIR-compliant record ready</div>
                  </div>
                  <div>
                    <Badge variant="outline">{selectedTerm.namaste_code}</Badge>
                    <Badge className="ml-2">{selectedTerm.icd_code}</Badge>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full" 
              onClick={handleSavePatient}
              disabled={patientLoading || !selectedTerm || !patientName || !patientAge}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {patientLoading ? "Saving..." : "Save Patient Record"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Saved Patients */}
      {patients.length > 0 && (
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Recent Patient Records</CardTitle>
            <CardDescription>
              Your saved patient records with dual coding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {patients.slice(0, 5).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium">{patient.name} ({patient.age} years)</div>
                    <div className="text-sm text-muted-foreground">{patient.diagnosis}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{patient.namaste_code}</Badge>
                    <Badge className="ml-2">{patient.icd_code}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Demo Section */}
      <Card className="mb-12">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Play className="h-5 w-5" />
            Platform Walkthrough
          </CardTitle>
          <CardDescription>
            Watch our comprehensive demonstration of the integration platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Demo video will be embedded here</p>
              <p className="text-sm text-muted-foreground mt-2">
                Showing real-time API integration with EMR systems
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Sandbox */}
      <div className="text-center">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Try Live Sandbox
            </CardTitle>
            <CardDescription>
              Access our development environment with real API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Test the complete integration with sample data in a secure environment
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/logs">
                <Button size="lg">
                  View Audit Logs
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg">
                  View API Docs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
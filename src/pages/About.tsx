import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Heart, Globe, Users, Linkedin, Github, Mail } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";

export const About = () => {
  const team = [
    {
      name: "Rahul Sharma",
      role: "Team Lead & Backend Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Priya Patel",
      role: "Frontend Developer & UI/UX",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Arjun Mehta",
      role: "Healthcare API Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Ananya Singh",
      role: "Ayurveda Domain Expert",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transforming healthcare through innovative integration of traditional Ayurveda 
            with modern medical standards for Smart India Hackathon 2025.
          </p>
        </div>

        {/* Problem Statement */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                The Challenge We're Solving
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  <strong className="text-foreground">Problem Statement:</strong> Integration of 
                  NAMASTE Ayurveda Terminologies with ICD-11 via APIs for Indian EHR systems.
                </p>
                <p className="leading-relaxed">
                  Traditional Ayurvedic medicine practices contain centuries of valuable medical 
                  knowledge, but this information remains isolated from modern healthcare systems. 
                  The lack of standardized terminology mapping creates barriers for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Healthcare providers accessing complete patient histories</li>
                  <li>Research institutions analyzing traditional medicine effectiveness</li>
                  <li>Government health departments tracking holistic healthcare outcomes</li>
                  <li>Insurance systems processing comprehensive treatment records</li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img 
                src={teamImage} 
                alt="Team collaboration on healthcare technology"
                className="w-full h-auto rounded-2xl shadow-card"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Bridge the Gap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Create seamless interoperability between traditional Ayurvedic terminology 
                  and modern ICD-11 healthcare standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Preserve Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Honor and digitally preserve India's rich traditional medicine knowledge 
                  for future generations of healthcare professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-government/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-government" />
                </div>
                <CardTitle>Enable Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Empower researchers and healthcare providers with comprehensive, 
                  standardized data for evidence-based holistic care.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              Passionate developers and healthcare experts working together 
              for Smart India Hackathon 2025
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-border hover:shadow-card transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary/10 group-hover:border-primary/30 transition-colors"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.linkedin} aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.github} aria-label="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="mailto:team@ayush-icd11.com" aria-label="Email">
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
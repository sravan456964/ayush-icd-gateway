import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  FileText, 
  Users, 
  Zap, 
  Play, 
  Book,
  Heart
} from "lucide-react";

export const Footer = () => {
  const navigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Features", href: "/features" },
      { name: "Demo", href: "/demo" },
      { name: "Documentation", href: "/docs" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "API Documentation", href: "/docs", icon: Book },
      { name: "GitHub Repository", href: "#", icon: Github },
      { name: "Sample Data", href: "#", icon: FileText },
      { name: "Community Forum", href: "#", icon: Users },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "API Terms", href: "#" },
      { name: "Data Usage", href: "#" },
    ]
  };

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Email", href: "mailto:team@ayush-icd11.com", icon: Mail },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-lg text-foreground">
                Ayush ↔ ICD-11
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Bridging traditional Ayurveda with modern healthcare standards through 
              intelligent API integration for Indian EHR systems.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button key={link.name} variant="ghost" size="sm" asChild>
                    <a href={link.href} aria-label={link.name}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <div className="space-y-3">
              {navigation.main.map((item) => (
                <div key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <div className="space-y-3">
              {navigation.resources.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name}>
                    <Link 
                      to={item.href}
                      className="flex items-center text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      <Icon className="w-3 h-3 mr-2" />
                      {item.name}
                      {item.href.startsWith('#') && <ExternalLink className="w-3 h-3 ml-1" />}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <div className="space-y-3">
              {navigation.legal.map((item) => (
                <div key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-foreground text-sm mb-2">Support</h4>
              <p className="text-muted-foreground text-xs mb-2">
                team@ayush-icd11.com
              </p>
              <p className="text-muted-foreground text-xs">
                Response within 24 hours
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-muted-foreground text-sm">
              © 2025 Ayush ↔ ICD-11 Integration Platform. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <span>Developed for Smart India Hackathon 2025</span>
              <Heart className="w-3 h-3 text-red-500 mx-1" />
              <span>Ministry of Ayush</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>System Status: Operational</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/demo">
                <Zap className="w-3 h-3 mr-1" />
                Try Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Government Badge */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-4 bg-gradient-to-r from-primary via-background to-secondary rounded-sm border border-border" />
              <span>Government of India Initiative</span>
            </div>
            <span className="hidden md:block">•</span>
            <span>Ministry of Ayush</span>
            <span className="hidden md:block">•</span>
            <span>All India Institute of Medical Sciences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
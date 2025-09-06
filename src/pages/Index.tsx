import { motion } from "framer-motion";
import { ArrowRight, Users, Target, BarChart3, MessageSquare, CheckSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-collaboration.jpg";

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Project Management",
      description: "Organize projects with intuitive Kanban boards and task tracking."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time chat and file sharing."
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track progress with detailed reports and performance metrics."
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get intelligent suggestions and automate routine tasks."
    },
    {
      icon: CheckSquare,
      title: "Task Automation",
      description: "Streamline workflows with smart task assignments and reminders."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Modern interface built for speed and efficiency."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">CX</span>
            </div>
            <span className="font-bold text-xl text-foreground">CollaboroX</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="ghost" asChild>
              <a href="/login">Sign In</a>
            </Button>
            <Button variant="hero" asChild>
              <a href="/signup">
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="mb-4">
                ✨ Advanced Team Collaboration Platform
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Streamline Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Team's Success
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                CollaboroX brings your team together with powerful project management, 
                real-time collaboration, and AI-powered insights. Get more done, faster.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" variant="hero" asChild>
                  <a href="/signup">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </a>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <a href="/login">
                    Sign In
                  </a>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Team collaboration dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-primary/20 rounded-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to boost productivity and keep your team aligned.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full hover-lift bg-gradient-surface border border-border/50 shadow-md hover:shadow-xl transition-all duration-300">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Transform Your Team?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of teams already using CollaboroX to achieve more together.
            </p>
            <Button size="xl" variant="hero" asChild>
              <a href="/signup">
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">CX</span>
              </div>
              <span className="font-semibold text-foreground">CollaboroX</span>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              © 2024 CollaboroX. Advanced Team Collaboration Platform.
            </p>
            
            <div className="flex space-x-6">
              <Button variant="link" className="p-0 h-auto text-sm">Privacy</Button>
              <Button variant="link" className="p-0 h-auto text-sm">Terms</Button>
              <Button variant="link" className="p-0 h-auto text-sm">Support</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

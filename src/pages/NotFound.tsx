import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center bg-gradient-surface border border-border/50 shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <a href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/">
                Return to Home
              </a>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;

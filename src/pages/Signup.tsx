import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PasswordStrength {
  score: number;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const getPasswordStrength = (password: string): PasswordStrength => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    return { score, checks };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthPercentage = (passwordStrength.score / 5) * 100;
  
  const getStrengthText = () => {
    if (passwordStrength.score <= 1) return "Very Weak";
    if (passwordStrength.score <= 2) return "Weak";
    if (passwordStrength.score <= 3) return "Fair";
    if (passwordStrength.score <= 4) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength.score <= 1) return "bg-destructive";
    if (passwordStrength.score <= 2) return "bg-warning";
    if (passwordStrength.score <= 3) return "bg-warning";
    if (passwordStrength.score <= 4) return "bg-primary";
    return "bg-success";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in real app, validate with API
    localStorage.setItem('collaborox_token', 'mock-jwt-token');
    navigate('/dashboard');
  };

  const isFormValid = formData.name.length >= 2 && 
                     formData.email.includes('@') && 
                     passwordStrength.score >= 3;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">CX</span>
            </div>
            <span className="font-bold text-2xl text-foreground">CollaboroX</span>
          </div>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 bg-gradient-surface border border-border/50 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Strength */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Password strength</span>
                      <span className={cn(
                        "text-xs font-medium",
                        passwordStrength.score <= 2 ? "text-destructive" :
                        passwordStrength.score <= 3 ? "text-warning" :
                        passwordStrength.score <= 4 ? "text-primary" : "text-success"
                      )}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <Progress 
                      value={strengthPercentage} 
                      className={cn("h-2", getStrengthColor())}
                    />
                    
                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {Object.entries({
                        "8+ characters": passwordStrength.checks.length,
                        "Uppercase": passwordStrength.checks.uppercase,
                        "Lowercase": passwordStrength.checks.lowercase,
                        "Number": passwordStrength.checks.number,
                      }).map(([label, met]) => (
                        <div key={label} className="flex items-center space-x-2">
                          {met ? (
                            <Check className="h-3 w-3 text-success" />
                          ) : (
                            <X className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className={cn(
                            "text-xs",
                            met ? "text-success" : "text-muted-foreground"
                          )}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid}
              >
                Create Account
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                </span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm font-medium"
                  onClick={() => navigate('/login')}
                >
                  Sign in here
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          By creating an account, you agree to our{' '}
          <Button variant="link" className="p-0 h-auto text-xs">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="p-0 h-auto text-xs">
            Privacy Policy
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(100, "City must be less than 100 characters"),
  tickets: z.number().min(1, "Please select at least 1 ticket").max(10, "Maximum 10 tickets per registration"),
});

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    tickets: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const validatedData = registrationSchema.parse(formData);
      
      setIsSubmitting(true);
      
      // TODO: Replace with Supabase integration
      // This is where you'll add the Supabase database insertion
      console.log("Registration data:", validatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration Successful!",
        description: "Check your email for confirmation and payment details.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", city: "", tickets: 1 });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <Card className="gradient-card border-border/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl gradient-secondary bg-clip-text text-transparent">
                Register Now
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Secure your spot at the most innovative tech event of the year
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="transition-smooth focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="transition-smooth focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter your city"
                    required
                    className="transition-smooth focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tickets">Number of Tickets</Label>
                  <Select
                    value={formData.tickets.toString()}
                    onValueChange={(value) => handleInputChange("tickets", parseInt(value))}
                  >
                    <SelectTrigger className="transition-smooth focus:glow-primary">
                      <SelectValue placeholder="Select tickets" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Ticket" : "Tickets"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glow-primary transition-bounce hover:scale-105 hover:glow-accent"
                >
                  {isSubmitting ? "Registering..." : "Submit Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
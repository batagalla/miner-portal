
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MessageSquare, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      });
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-binance-text/80 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you with any inquiries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-binance-darker border-binance-light/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-bitcoin" />
                Email Us
              </CardTitle>
              <CardDescription>
                Send us an email directly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a href="mailto:support@cryptotab.com" className="text-binance-text hover:text-bitcoin transition-colors">
                support@cryptotab.com
              </a>
            </CardContent>
          </Card>
          
          <Card className="bg-binance-darker border-binance-light/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-bitcoin" />
                Live Chat
              </CardTitle>
              <CardDescription>
                Chat with our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-binance-text/80 mb-2">
                Available Monday to Friday
              </p>
              <p className="text-binance-text/80">
                9:00 AM - 6:00 PM UTC
              </p>
              <Button className="mt-4 w-full bg-bitcoin hover:bg-bitcoin-light text-white">
                Start Chat
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-binance-darker border-binance-light/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-bitcoin" />
                Location
              </CardTitle>
              <CardDescription>
                Our headquarters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-binance-text/80">
                123 Blockchain Street<br />
                Crypto Valley<br />
                Zug, Switzerland<br />
                CH-6300
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card className="bg-binance-darker border-binance-light/10">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        required
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select disabled={isSubmitting || isSubmitted}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="payment">Payment Questions</SelectItem>
                        <SelectItem value="affiliate">Affiliate Program</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                      disabled={isSubmitting || isSubmitted}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-bitcoin hover:bg-bitcoin-light text-white"
                    disabled={isSubmitting || isSubmitted}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="bg-binance-darker border-binance-light/10 h-full">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Check out these common questions before reaching out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-1">How long does it take to get a response?</h3>
                    <p className="text-binance-text/70 text-sm">
                      We typically respond to all inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-1">I forgot my password. What should I do?</h3>
                    <p className="text-binance-text/70 text-sm">
                      You can reset your password by clicking the "Forgot Password" link on the login page.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-1">Where can I find my referral link?</h3>
                    <p className="text-binance-text/70 text-sm">
                      Your unique referral link is available in the Affiliate section of your dashboard.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-1">How do I withdraw my earnings?</h3>
                    <p className="text-binance-text/70 text-sm">
                      You can withdraw your earnings from the Payouts section once you've reached the
                      minimum threshold of 0.001 BTC.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = '/faq'}
                    >
                      View All FAQs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-binance-text/80 mb-6 max-w-3xl mx-auto">
            Connect with other CryptoTab users, get the latest updates, and share your experiences
            by joining our community on social media.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-[#3b5998]/10 flex items-center justify-center text-[#3b5998] hover:bg-[#3b5998]/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
              </svg>
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc] hover:bg-[#0088cc]/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.64 8.8 16.33 11.31 15.23 11.97C15.23 11.97 15.37 10.7 14.65 10.21C13.93 9.72 12.99 10.61 12.42 11.4C12.42 11.4 12.23 8.91 8.92 10.73C5.61 12.55 7.7 17.59 7.7 17.59C7.7 17.59 6.6 11.94 8.88 10.12C8.88 10.12 10.01 9.72 10.01 11.4V15.13C10.01 15.13 9.32 14.84 9 15.13C8.68 15.42 8.92 17.59 8.92 17.59C8.92 17.59 7.02 14.03 10.01 12.88C10.01 12.88 10.01 15.13 10.8 15.13C11.58 15.13 12.99 15.13 12.99 15.13C12.99 15.13 15.11 15.14 16.64 8.8Z" />
              </svg>
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000]/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

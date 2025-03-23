
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { AuthContext } from "@/App";
import { AlertTriangle, Bell, Fingerprint, Globe, Lock, Shield, Wrench } from "lucide-react";

const Settings = () => {
  const { email } = useContext(AuthContext);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [miningNotifications, setMiningNotifications] = useState(true);
  const [payoutNotifications, setPayoutNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(false);
  const [payoutThreshold, setPayoutThreshold] = useState("0.001");
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    });
  };

  const enableTwoFactor = () => {
    setTwoFactorEnabled(true);
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure."
    });
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-binance-text">Account Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="mining">Mining</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} readOnly className="bg-binance-light/20" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wallet">Bitcoin Wallet Address</Label>
                <Input 
                  id="wallet" 
                  placeholder="Enter your Bitcoin wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              
              <Button onClick={saveSettings} className="bg-bitcoin hover:bg-bitcoin-light text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-binance-text/70">Add an extra layer of security to your account</p>
                </div>
                {twoFactorEnabled ? (
                  <div className="flex items-center text-green-500">
                    <span className="text-sm mr-2">Enabled</span>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                ) : (
                  <Button onClick={enableTwoFactor} variant="outline">
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Enable
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Password</h3>
                  <p className="text-sm text-binance-text/70">Change your password regularly for better security</p>
                </div>
                <Button variant="outline">
                  <Lock className="mr-2 h-4 w-4" />
                  Change
                </Button>
              </div>
              
              <div className="bg-amber-500/20 border border-amber-600/30 p-4 rounded-lg flex items-start">
                <AlertTriangle className="text-amber-500 h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-500">Security Recommendation</h4>
                  <p className="text-sm text-binance-text/90">
                    Enable two-factor authentication to protect your account and earnings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <p className="text-sm text-binance-text/70">Receive general updates and announcements</p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Mining Updates</h3>
                  <p className="text-sm text-binance-text/70">Get notified about significant mining events</p>
                </div>
                <Switch 
                  id="mining-notifications"
                  checked={miningNotifications}
                  onCheckedChange={setMiningNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Payout Notifications</h3>
                  <p className="text-sm text-binance-text/70">Receive alerts when payouts are processed</p>
                </div>
                <Switch 
                  id="payout-notifications"
                  checked={payoutNotifications}
                  onCheckedChange={setPayoutNotifications}
                />
              </div>
              
              <Button onClick={saveSettings} className="bg-bitcoin hover:bg-bitcoin-light text-white">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mining" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                Mining Configuration
              </CardTitle>
              <CardDescription>Customize your mining experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Auto Payout</h3>
                  <p className="text-sm text-binance-text/70">Automatically send earnings to your wallet</p>
                </div>
                <Switch 
                  id="auto-payout"
                  checked={autoPayoutEnabled}
                  onCheckedChange={setAutoPayoutEnabled}
                />
              </div>
              
              {autoPayoutEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="threshold">Payout Threshold (BTC)</Label>
                  <Input 
                    id="threshold" 
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={payoutThreshold}
                    onChange={(e) => setPayoutThreshold(e.target.value)}
                  />
                  <p className="text-xs text-binance-text/60">Minimum: 0.001 BTC</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="network">Mining Network</Label>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-green-500 font-medium">Connected</span>
                  <span className="text-binance-text/70 ml-2">|</span>
                  <span className="text-binance-text/90">Network #9751</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Global Mining Language</h3>
                  <p className="text-sm text-binance-text/70">Choose your preferred language for mining interface</p>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-binance-text/60" />
                  <select className="bg-binance-light/30 border border-binance-light/20 rounded p-1 text-sm">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Russian</option>
                  </select>
                </div>
              </div>
              
              <Button onClick={saveSettings} className="bg-bitcoin hover:bg-bitcoin-light text-white">
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

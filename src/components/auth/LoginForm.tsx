
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (user: any) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const { name, password } = credentials;

      // Super Admin credentials (hardcoded)
      if (name === 'SUP@ADMIN' && password === 'SUP@LEGACY@123') {
        onLogin({ name, role: 'super-admin' });
        toast({ title: 'Welcome Super Admin!', description: 'Access granted to all systems.' });
      }
      // Demo Admin
      else if (name.toLowerCase().includes('admin') && password === 'admin123') {
        onLogin({ name, role: 'admin' });
        toast({ title: 'Welcome Admin!', description: 'Manage your store operations.' });
      }
      // Demo Employee
      else if (name && password === 'emp123') {
        onLogin({ name, role: 'employee' });
        toast({ title: `Welcome ${name}!`, description: 'Ready to serve customers.' });
      }
      else {
        toast({ 
          title: 'Login Failed', 
          description: 'Invalid credentials. Try admin/admin123 or employee/emp123',
          variant: 'destructive'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-primary">
            Karachi Garment & Shoes Store
          </CardTitle>
          <p className="text-muted-foreground">Store Management System</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your username"
                value={credentials.name}
                onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1">
              <p><strong>Super Admin:</strong> SUP@ADMIN / SUP@LEGACY@123</p>
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Employee:</strong> anyname / emp123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

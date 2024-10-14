'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from '@/components/ui/alert';

const OnboardingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ownerName: '',
    emailId: '',
    phoneNumber: '',
    instituteName: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/institutes', formData);
      console.log('Form submitted successfully:', response.data);
      router.push('/dashboard');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'An error occurred while submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='absolute w-screen h-screen inset-0 bg-black bg-opacity-65 backdrop-blur-md flex items-center justify-center'>
      <Card className="w-[90%] md:w-full md:max-w-3xl">
        <CardHeader>
          <CardTitle>Welcome Onboard!</CardTitle>
          <CardDescription>Please fill in your details to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
              <div className="grid md:grid-cols-2 w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="emailId">Email</Label>
              <Input id="emailId" name="emailId" type="email" value={formData.emailId} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input id="instituteName" name="instituteName" value={formData.instituteName} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleChange}/>
            </div>
          </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Complete Onboarding'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingForm;
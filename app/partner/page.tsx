// "use client";

// import { useState } from "react";
// import { Header } from "@/components/layout/header";
// import { Footer } from "@/components/layout/footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Building2,
//   Users,
//   TrendingUp,
//   Shield,
//   CheckCircle,
//   Send,
//   Handshake,
//   Star,
//   Globe,
// } from "lucide-react";

// const benefits = [
//   {
//     icon: Users,
//     title: "Increased Customer Base",
//     description: "Access to 50,000+ active CityWitty cardholders",
//   },
//   {
//     icon: TrendingUp,
//     title: "Boost Revenue",
//     description: "Average 30% increase in sales for partner merchants",
//   },
//   {
//     icon: Shield,
//     title: "Guaranteed Payments",
//     description: "Secure and timely payment processing",
//   },
//   {
//     icon: Globe,
//     title: "Marketing Support",
//     description: "Featured placement on our platform and marketing materials",
//   },
// ];

// const categories = [
//   "Hotels & Resorts",
//   "Restaurants & Dining",
//   "Salon & Spa",
//   "Electronics",
//   "Fashion & Apparel",
//   "Automotive",
//   "Fitness & Gym",
//   "Education",
//   "Healthcare",
//   "Travel & Tourism",
//   "Real Estate",
//   "Other",
// ];

// const cities = [
//   "Mumbai",
//   "Delhi",
//   "Bangalore",
//   "Chennai",
//   "Pune",
//   "Hyderabad",
//   "Kolkata",
//   "Ahmedabad",
//   "Jaipur",
//   "Surat",
//   "Lucknow",
//   "Kanpur",
//   "Nagpur",
//   "Indore",
//   "Thane",
//   "Bhopal",
//   "Visakhapatnam",
//   "Patna",
//   "Vadodara",
//   "Coimbatore",
//   "Other",
// ];

// export default function PartnerPage() {
//   const [formData, setFormData] = useState({
//     businessName: "",
//     ownerName: "",
//     email: "",
//     phone: "",
//     category: "",
//     city: "",
//     address: "",
//     gstNumber: "",
//     panNumber: "",
//     businessType: "",
//     yearsInBusiness: "",
//     averageMonthlyRevenue: "",
//     discountOffered: "",
//     description: "",
//     website: "",
//     socialMedia: "",
//     agreeToTerms: false,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//     }, 2000);
//   };

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   if (isSubmitted) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <Header />
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="max-w-2xl mx-auto text-center">
//             <Card className="border-0 shadow-xl bg-green-50">
//               <CardContent className="p-12">
//                 <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                   Application Submitted Successfully!
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-6">
//                   Thank you for your interest in partnering with CityWitty. Our
//                   team will review your application and contact you within 2-3
//                   business days.
//                 </p>
//                 <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                   <p className="text-blue-800 font-medium">
//                     Application ID: CW-
//                     {Math.random().toString(36).substr(2, 9).toUpperCase()}
//                   </p>
//                   <p className="text-blue-600 text-sm">
//                     Please save this ID for future reference
//                   </p>
//                 </div>
//                 <Button
//                   onClick={() => setIsSubmitted(false)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Submit Another Application
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//         <Footer />
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <Header />

//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-4xl lg:text-6xl font-bold">
//                 Partner With CityWitty
//               </h1>
//               <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//                 Join 1000+ premium merchants and grow your business with our
//                 exclusive discount platform
//               </p>
//             </div>

//             <div className="flex items-center justify-center space-x-8">
//               <div className="text-center">
//                 <div className="text-3xl font-bold">1000+</div>
//                 <div className="text-blue-100">Partner Merchants</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">50K+</div>
//                 <div className="text-blue-100">Active Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">30%</div>
//                 <div className="text-blue-100">Avg. Sales Increase</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Why Partner With Us?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Discover the benefits of joining India's fastest-growing discount
//               platform
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//             {benefits.map((benefit) => {
//               const IconComponent = benefit.icon;
//               return (
//                 <Card
//                   key={benefit.title}
//                   className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <CardContent className="p-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
//                       <IconComponent className="h-8 w-8" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                       {benefit.title}
//                     </h3>
//                     <p className="text-gray-600">{benefit.description}</p>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Application Form */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-4xl mx-auto">
//             <Card className="border-0 shadow-xl">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
//                   <Handshake className="h-8 w-8 text-blue-600" />
//                   <span>Merchant Application Form</span>
//                 </CardTitle>
//                 <CardDescription className="text-lg">
//                   Fill out the form below to start your partnership journey with
//                   CityWitty
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                   {/* Business Information */}
//                   <div className="space-y-6">
//                     <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                       Business Information
//                     </h3>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="businessName">Business Name *</Label>
//                         <Input
//                           id="businessName"
//                           value={formData.businessName}
//                           onChange={(e) =>
//                             handleInputChange("businessName", e.target.value)
//                           }
//                           placeholder="Enter your business name"
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="ownerName">Owner/Manager Name *</Label>
//                         <Input
//                           id="ownerName"
//                           value={formData.ownerName}
//                           onChange={(e) =>
//                             handleInputChange("ownerName", e.target.value)
//                           }
//                           placeholder="Enter owner/manager name"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="category">Business Category *</Label>
//                         <Select
//                           value={formData.category}
//                           onValueChange={(value) =>
//                             handleInputChange("category", value)
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {categories.map((category) => (
//                               <SelectItem key={category} value={category}>
//                                 {category}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="city">City *</Label>
//                         <Select
//                           value={formData.city}
//                           onValueChange={(value) =>
//                             handleInputChange("city", value)
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select city" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {cities.map((city) => (
//                               <SelectItem key={city} value={city}>
//                                 {city}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="address">Business Address *</Label>
//                       <Textarea
//                         id="address"
//                         value={formData.address}
//                         onChange={(e) =>
//                           handleInputChange("address", e.target.value)
//                         }
//                         placeholder="Enter complete business address"
//                         rows={3}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="space-y-6">
//                     <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                       Contact Information
//                     </h3>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email Address *</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           value={formData.email}
//                           onChange={(e) =>
//                             handleInputChange("email", e.target.value)
//                           }
//                           placeholder="business@email.com"
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="phone">Phone Number *</Label>
//                         <Input
//                           id="phone"
//                           type="tel"
//                           value={formData.phone}
//                           onChange={(e) =>
//                             handleInputChange("phone", e.target.value)
//                           }
//                           placeholder="+91 6389202030"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="website">Website (Optional)</Label>
//                         <Input
//                           id="website"
//                           type="url"
//                           value={formData.website}
//                           onChange={(e) =>
//                             handleInputChange("website", e.target.value)
//                           }
//                           placeholder="https://yourbusiness.com"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="socialMedia">
//                           Social Media (Optional)
//                         </Label>
//                         <Input
//                           id="socialMedia"
//                           value={formData.socialMedia}
//                           onChange={(e) =>
//                             handleInputChange("socialMedia", e.target.value)
//                           }
//                           placeholder="Instagram/Facebook handle"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Legal Information */}
//                   <div className="space-y-6">
//                     <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                       Legal Information
//                     </h3>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="gstNumber">GST Number *</Label>
//                         <Input
//                           id="gstNumber"
//                           value={formData.gstNumber}
//                           onChange={(e) =>
//                             handleInputChange("gstNumber", e.target.value)
//                           }
//                           placeholder="Enter GST number"
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="panNumber">PAN Number *</Label>
//                         <Input
//                           id="panNumber"
//                           value={formData.panNumber}
//                           onChange={(e) =>
//                             handleInputChange("panNumber", e.target.value)
//                           }
//                           placeholder="Enter PAN number"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Business Details */}
//                   <div className="space-y-6">
//                     <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                       Business Details
//                     </h3>

//                     <div className="grid md:grid-cols-3 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="businessType">Business Type *</Label>
//                         <Select
//                           value={formData.businessType}
//                           onValueChange={(value) =>
//                             handleInputChange("businessType", value)
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select type" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="sole-proprietorship">
//                               Sole Proprietorship
//                             </SelectItem>
//                             <SelectItem value="partnership">
//                               Partnership
//                             </SelectItem>
//                             <SelectItem value="private-limited">
//                               Private Limited
//                             </SelectItem>
//                             <SelectItem value="public-limited">
//                               Public Limited
//                             </SelectItem>
//                             <SelectItem value="llp">LLP</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="yearsInBusiness">
//                           Years in Business *
//                         </Label>
//                         <Select
//                           value={formData.yearsInBusiness}
//                           onValueChange={(value) =>
//                             handleInputChange("yearsInBusiness", value)
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select years" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="0-1">0-1 years</SelectItem>
//                             <SelectItem value="1-3">1-3 years</SelectItem>
//                             <SelectItem value="3-5">3-5 years</SelectItem>
//                             <SelectItem value="5-10">5-10 years</SelectItem>
//                             <SelectItem value="10+">10+ years</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="discountOffered">
//                           Discount Offered *
//                         </Label>
//                         <Select
//                           value={formData.discountOffered}
//                           onValueChange={(value) =>
//                             handleInputChange("discountOffered", value)
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select discount" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="10-15">10-15%</SelectItem>
//                             <SelectItem value="15-20">15-20%</SelectItem>
//                             <SelectItem value="20-30">20-30%</SelectItem>
//                             <SelectItem value="30-40">30-40%</SelectItem>
//                             <SelectItem value="40+">40%+</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="averageMonthlyRevenue">
//                         Average Monthly Revenue *
//                       </Label>
//                       <Select
//                         value={formData.averageMonthlyRevenue}
//                         onValueChange={(value) =>
//                           handleInputChange("averageMonthlyRevenue", value)
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select revenue range" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="0-1L">₹0 - ₹1 Lakh</SelectItem>
//                           <SelectItem value="1-5L">₹1 - ₹5 Lakh</SelectItem>
//                           <SelectItem value="5-10L">₹5 - ₹10 Lakh</SelectItem>
//                           <SelectItem value="10-25L">₹10 - ₹25 Lakh</SelectItem>
//                           <SelectItem value="25L+">₹25 Lakh+</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="description">
//                         Business Description *
//                       </Label>
//                       <Textarea
//                         id="description"
//                         value={formData.description}
//                         onChange={(e) =>
//                           handleInputChange("description", e.target.value)
//                         }
//                         placeholder="Describe your business, services, and what makes you unique..."
//                         rows={4}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Terms and Conditions */}
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="terms"
//                         checked={formData.agreeToTerms}
//                         onCheckedChange={(checked) =>
//                           handleInputChange("agreeToTerms", checked as boolean)
//                         }
//                         required
//                       />
//                       <Label htmlFor="terms" className="text-sm">
//                         I agree to the{" "}
//                         <a
//                           href="/terms"
//                           className="text-blue-600 hover:underline"
//                         >
//                           Terms & Conditions
//                         </a>{" "}
//                         and{" "}
//                         <a
//                           href="/privacy"
//                           className="text-blue-600 hover:underline"
//                         >
//                           Privacy Policy
//                         </a>
//                       </Label>
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
//                     disabled={isSubmitting || !formData.agreeToTerms}
//                   >
//                     {isSubmitting ? (
//                       "Submitting Application..."
//                     ) : (
//                       <>
//                         <Send className="mr-2 h-5 w-5" />
//                         Submit Partnership Application
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  TrendingUp,
  Shield,
  Globe,
  Handshake,
  Send,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Increased Customer Base",
    description: "Access to 50,000+ active CityWitty cardholders",
  },
  {
    icon: TrendingUp,
    title: "Boost Revenue",
    description: "Average 30% increase in sales for partner merchants",
  },
  {
    icon: Shield,
    title: "Guaranteed Payments",
    description: "Secure and timely payment processing",
  },
  {
    icon: Globe,
    title: "Marketing Support",
    description: "Featured placement on our platform and marketing materials",
  },
];

const categories = [
  "Hotels & Resorts",
  "Restaurants & Dining",
  "Salon & Spa",
  "Electronics",
  "Fashion & Apparel",
  "Automotive",
  "Fitness & Gym",
  "Education",
  "Healthcare",
  "Travel & Tourism",
  "Real Estate",
  "Other",
];

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Coimbatore",
  "Other",
];

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Partner With CityWitty
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join 1000+ premium merchants and grow your business with our
                exclusive discount platform
              </p>
            </div>

            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-blue-100">Partner Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-blue-100">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">30%</div>
                <div className="text-blue-100">Avg. Sales Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of joining India's fastest-growing discount
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form (disabled preview + Google Form button) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
                  <Handshake className="h-8 w-8 text-blue-600" />
                  <span>Merchant Application Form</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  (Preview only — Please use the button below to register)
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form className="space-y-8">
                  {/* Example fields (disabled) */}
                  <div className="space-y-2">
                    <Label>Business Name *</Label>
                    <Input placeholder="Enter your business name" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="business@email.com" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Address *</Label>
                    <Textarea
                      placeholder="Enter complete business address"
                      rows={3}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Checkbox id="terms" disabled />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms & Conditions and Privacy Policy
                    </Label>
                  </div>

                  {/* Google Form Button */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfPBEpKz6EozvchiRYjnZFA5GSs3SdnN2eoyz1Oqiuxga1u6A/viewform?pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 rounded-lg text-white"
                  >
                    Register via Google Form
                  </a>


                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

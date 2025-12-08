"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import { toast } from "sonner"; // Optional: for notifications
import { userProfileUpdate } from "@/lib/api";

// (Using `userProfileUpdate` from `lib/api` for profile updates)

export default function MyProfileTab() {
  const { data: session, update } = useSession();
  const user = session?.user;

  // Initialize form data from session
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Initialize form data when session loads
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || ["", ""];
      const newData = {
        firstName: nameParts[0] || "",
        lastName: nameParts[1] || "",
        email: user.email || "",
        phone: "+1234567890",
        address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      };

      // Defer the update to the next tick to avoid synchronous setState in effect
      setTimeout(() => {
        setFormData((prev) => {
          try {
            if (JSON.stringify(prev) !== JSON.stringify(newData)) {
              return newData;
            }
          } catch {
            // Fallback: if serialization fails, set directly
            return newData;
          }
          return prev;
        });
      }, 0);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving profile:", formData);

      // Call the update function
      await userProfileUpdate(formData);

      // Update the session with new data if needed
      await update({
        ...session,
        user: {
          ...session?.user,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Profile Information Section */}
      <div className="lg:col-span-1 bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Profile Information
        </h2>
        <p className="text-gray-600 mb-6">
          Manage your personal details and account preferences.
        </p>

        <div className="space-y-6">
          {/* First and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Shipping Address"
              className="w-full"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2"
          >
            💾 Save Changes
          </Button>
        </div>
      </div>

      {/* Account Actions Section */}
      <div className="bg-white rounded-lg p-8 border border-gray-200 h-fit">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Account Actions
        </h2>
        <p className="text-gray-600 mb-6">
          Quick access to manage your account settings and activity.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Role
            </label>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 text-gray-700">
              User
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 text-gray-700">
              14 August, 2025
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full mt-auto border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
          >
            <LogIn className="text-red-500" /> Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

// Updated API function that accepts an object instead of FormData

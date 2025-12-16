"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { userProfileUpdate } from "@/lib/api";

// Define the shape of the user session
interface SessionUser {
  name?: string | null;
  email?: string | null;
  phone?: string;
  address?: string;
}

// Define the shape of the data we manage in the form state
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

// Helper function to initialize state from the user session data
const initializeEditedValues = (user: SessionUser | undefined): ProfileData => {
  // Split name for first and last, handling cases where 'name' is null or undefined
  const [firstName = "", lastName = ""] = user?.name?.split(" ") || [];

  return {
    firstName: firstName,
    lastName: lastName,
    email: user?.email || "",
    // Fallback/Placeholder values if session data is missing
    phone: user?.phone || "+1234567890",
    address: user?.address || "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  };
};

export default function MyProfileTab() {
  const { data: session, update } = useSession();
  const user = session?.user as SessionUser | undefined;

  // 1. Initialize state with current user data.
  // This state now holds ALL current form data (initial data + user edits).
  const [editedValues, setEditedValues] = useState<ProfileData>(() =>
    initializeEditedValues(user),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the state with the new value (including an empty string if cleared)
    setEditedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // console.log("Saving profile:", editedValues);

      // 3. Prepare data for the API call
      const dataToSave = {
        ...editedValues,
        // The API expects a full name, so combine first and last name from state
        name: `${editedValues.firstName} ${editedValues.lastName}`.trim(),
      };

      // Call the update function
      await userProfileUpdate(dataToSave);

      // 4. Update the NextAuth session with the new state values
      await update({
        ...session,
        user: {
          ...session?.user,
          name: dataToSave.name,
          email: dataToSave.email,
          phone: dataToSave.phone,
          address: dataToSave.address,
        },
      });

      // After a successful save and session update, re-sync state (though update() should handle it)

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
                // 5. Bind directly to the mutable state
                value={editedValues.firstName}
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
                // 5. Bind directly to the mutable state
                value={editedValues.lastName}
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
              // 5. Bind directly to the mutable state
              value={editedValues.email}
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
              // 5. Bind directly to the mutable state
              value={editedValues.phone}
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
              // 5. Bind directly to the mutable state
              value={editedValues.address}
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
              {/* Note: This is still hardcoded for now, you might want to pull this from the session/user object */}
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

// Assuming the API function and component imports are available in your environment
// Updated API function that accepts an object instead of FormData

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

const LoginRequired = () => {
  return (
    <div className="w-full flex mx-auto justify-center items-center py-20">
      <Card className="max-w-md w-full p-6 shadow-md mx-auto border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login Required
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            You need to sign in to View your recent books.
          </p>

          <Link href="/login">
            <Button className="w-full flex items-center gap-2">
              <LogIn size={18} /> Login Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginRequired;

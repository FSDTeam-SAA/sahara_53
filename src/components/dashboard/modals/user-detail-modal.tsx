"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@/lib/types";
import { Mail } from "lucide-react";

interface UserDetailModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export function UserDetailModal({ user, open, onClose }: UserDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-5 w-5 flex items-center justify-center text-gray-400">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium">{user.address || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-5 w-5 flex items-center justify-center text-gray-400">
                  <span className="text-lg">📚</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Stories</p>
                  <p className="text-sm font-medium">{user.totalStories}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">User not found</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

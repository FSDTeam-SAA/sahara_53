"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import { useUser } from "@/hooks/use-users"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail, Phone, Calendar, Shield, Clock } from "lucide-react"

interface UserDetailModalProps {
  userId: string | null
  open: boolean
  onClose: () => void
}

export function UserDetailModal({ userId, open, onClose }: UserDetailModalProps) {
  const { user, isLoading } = useUser(userId)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <StatusBadge status={user.status} />
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
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-medium capitalize">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Created At</p>
                  <p className="text-sm font-medium">{user.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Last Login</p>
                  <p className="text-sm font-medium">{user.lastLogin || "Never"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">User not found</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

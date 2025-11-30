"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { useOrder } from "@/hooks/use-orders"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, User, Mail, Phone, MapPin, Package, DollarSign, Calendar } from "lucide-react"

interface OrderDetailModalProps {
  orderId: string | null
  open: boolean
  onClose: () => void
}

export function OrderDetailModal({ orderId, open, onClose }: OrderDetailModalProps) {
  const { order, isLoading } = useOrder(orderId)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : order ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <span className="font-bold text-lg">{order.invoiceNumber}</span>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={order.payment} />
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">Customer Information</h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium">{order.customer.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{order.customer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{order.customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{order.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">Order Information</h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Ordered Item</p>
                    <p className="text-sm font-medium">{order.orderedItem}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-sm font-medium">${order.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Order Date</p>
                    <p className="text-sm font-medium">{order.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Order not found</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

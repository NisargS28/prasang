"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Package, CheckCircle, Clock } from "lucide-react"

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()
      setOrders(Array.isArray(data) ? data : [data])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setOrderStatuses({ ...orderStatuses, [orderId]: newStatus })
      // In a real app, this would persist to backend
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true
    const status = orderStatuses[order.id] || order.status
    return status === statusFilter
  })

  const completedCount = orders.filter((o) => orderStatuses[o.id] === "delivered" || o.status === "completed").length
  const pendingCount = orders.filter((o) => !orderStatuses[o.id] || orderStatuses[o.id] === "pending").length

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <p>Loading orders...</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-light mb-12 tracking-tight">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary p-6 border border-border">
              <div className="flex items-center gap-4">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-light">{orders.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-6 border border-border">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-light">{pendingCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-6 border border-border">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-3xl font-light">{completedCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            {["all", "pending", "processing", "delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">Order ID</th>
                  <th className="text-left py-4 px-4 font-semibold">Product</th>
                  <th className="text-left py-4 px-4 font-semibold">Size</th>
                  <th className="text-left py-4 px-4 font-semibold">Price</th>
                  <th className="text-left py-4 px-4 font-semibold">Customer Info</th>
                  <th className="text-left py-4 px-4 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const currentStatus = orderStatuses[order.id] || order.status
                    return (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                        <td className="py-4 px-4 font-mono text-sm">{order.id}</td>
                        <td className="py-4 px-4">{order.productName}</td>
                        <td className="py-4 px-4">{order.size}</td>
                        <td className="py-4 px-4 font-semibold">₹{order.price.toLocaleString("en-IN")}</td>
                        <td className="py-4 px-4 text-sm">
                          <div className="space-y-1">
                            {order.email && <p>{order.email}</p>}
                            {order.phone && <p>{order.phone}</p>}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={currentStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="border border-border px-3 py-1 text-sm bg-background"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

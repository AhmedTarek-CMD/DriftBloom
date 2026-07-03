export const orders = [
  { id: 'DB-1042', customer: 'Mona El-Sayed', date: '2026-06-24', items: 2, total: 2900, status: 'Delivered', payment: 'Card' },
  { id: 'DB-1041', customer: 'Youssef Adel', date: '2026-06-24', items: 1, total: 1350, status: 'Out for Delivery', payment: 'Cash on Delivery' },
  { id: 'DB-1040', customer: 'Salma Tarek', date: '2026-06-23', items: 3, total: 4050, status: 'Being Prepared', payment: 'Card' },
  { id: 'DB-1039', customer: 'Omar Khaled', date: '2026-06-22', items: 1, total: 1250, status: 'Delivered', payment: 'Fawry' },
  { id: 'DB-1038', customer: 'Nour Hassan', date: '2026-06-21', items: 2, total: 2600, status: 'Delivered', payment: 'Card' },
  { id: 'DB-1037', customer: 'Karim Fathy', date: '2026-06-20', items: 1, total: 1450, status: 'Cancelled', payment: 'Cash on Delivery' },
  { id: 'DB-1036', customer: 'Laila Mostafa', date: '2026-06-19', items: 4, total: 5300, status: 'Delivered', payment: 'Card' },
]

export const customers = [
  { id: 1, name: 'Mona El-Sayed', email: 'mona.elsayed@example.com', orders: 5, joined: '2025-11-02' },
  { id: 2, name: 'Youssef Adel', email: 'youssef.adel@example.com', orders: 2, joined: '2026-01-14' },
  { id: 3, name: 'Salma Tarek', email: 'salma.tarek@example.com', orders: 8, joined: '2025-08-21' },
  { id: 4, name: 'Omar Khaled', email: 'omar.khaled@example.com', orders: 1, joined: '2026-04-03' },
  { id: 5, name: 'Nour Hassan', email: 'nour.hassan@example.com', orders: 3, joined: '2026-02-17' },
]

export const dashboardStats = {
  totalRevenue: 184250,
  totalOrders: 312,
  totalCustomers: 198,
  totalPackages: 10,
}

import Link from "next/link";
import { mockDb } from "@/lib/mockData";

async function getDashboardStats() {
    const productCount = mockDb.products.countDocuments();
    const orderCount = mockDb.orders.countDocuments();
    const userCount = mockDb.users.countDocuments({ role: "user" });
    return { productCount, orderCount, userCount };
}

export default async function AdminDashboard() {
    const { productCount, orderCount, userCount } = await getDashboardStats();

    const stats = [
        { label: "Total Products", value: productCount, href: "/admin/products", color: "bg-indigo-500" },
        { label: "Total Orders", value: orderCount, href: "#", color: "bg-emerald-500" },
        { label: "Registered Users", value: userCount, href: "#", color: "bg-amber-500" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <Link href={stat.href} key={stat.label}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl mb-4`} />
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-gray-500 mt-1">{stat.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4 flex-wrap">
                    <Link
                        href="/admin/products/new"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        + Add Product
                    </Link>
                    <Link
                        href="/admin/products"
                        className="border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Manage Products
                    </Link>
                </div>
            </div>
        </div>
    );
}

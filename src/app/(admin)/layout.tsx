import Link from "next/link";

const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-60 bg-white border-r border-gray-100 flex flex-col shadow-sm">
                <div className="px-6 py-5 border-b border-gray-100">
                    <Link href="/admin" className="text-lg font-extrabold text-indigo-600">
                        ShopNow Admin
                    </Link>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400">
                    Logged in as Admin
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}

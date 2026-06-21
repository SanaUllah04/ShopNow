import Link from "next/link";
import { mockDb } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

async function getProducts() {
    return mockDb.products.find();
}

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                    + Add Product
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3 text-left">Product</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Stock</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product: any) => (
                            <tr key={product._id.toString()} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 text-gray-700">{formatPrice(product.price)}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 10
                                                ? "bg-green-100 text-green-700"
                                                : product.stock > 0
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/admin/products/${product._id}`}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium mr-4"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <p className="text-center text-gray-400 py-12">No products yet. Add your first one.</p>
                )}
            </div>
        </div>
    );
}

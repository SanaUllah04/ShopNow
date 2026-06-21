"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const slug = form.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock), slug }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            router.push("/admin/products");
            router.refresh();
        } else {
            setError(data?.error ?? "Failed to create product.");
        }
    };

    const categories = ["Electronics", "Footwear", "Accessories", "Lifestyle", "Clothing", "Home"];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {[
                    { label: "Product Name", name: "name", type: "text", placeholder: "e.g. Wireless Headphones" },
                    { label: "Image URL", name: "image", type: "url", placeholder: "https://..." },
                    { label: "Price ($)", name: "price", type: "number", placeholder: "0.00" },
                    { label: "Stock", name: "stock", type: "number", placeholder: "0" },
                ].map((field) => (
                    <div key={field.name} className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={(form as any)[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                ))}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe the product..."
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="border border-gray-200 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

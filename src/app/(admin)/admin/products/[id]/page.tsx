"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            if (res.ok && data) {
                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price !== undefined ? data.price.toString() : "",
                    category: data.category || "",
                    image: data.image || "",
                    stock: data.stock !== undefined ? data.stock.toString() : "",
                });
            }
            setFetching(false);
        }
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            router.push("/admin/products");
            router.refresh();
        } else {
            setError(data?.error ?? "Failed to update product.");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
            router.push("/admin/products");
            router.refresh();
        }
    };

    const categories = ["Electronics", "Footwear", "Accessories", "Lifestyle", "Clothing", "Home"];

    if (fetching) return <div className="text-gray-400 py-20 text-center">Loading product...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {[
                    { label: "Product Name", name: "name", type: "text" },
                    { label: "Image URL", name: "image", type: "url" },
                    { label: "Price ($)", name: "price", type: "number" },
                    { label: "Stock", name: "stock", type: "number" },
                ].map((field) => (
                    <div key={field.name} className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={(form as any)[field.name]}
                            onChange={handleChange}
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
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="border border-gray-200 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                        Delete Product
                    </button>
                </div>
            </form>
        </div>
    );
}

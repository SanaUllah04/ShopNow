"use client";
import { useCart } from "@/store/cartStore";
import { useState } from "react";

export function AddToCartButton({ product }: { product: any }) {
    const add = useCart(s => s.add);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        add({ _id: product._id, name: product.name, price: product.price, image: product.image });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                added
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-950 hover:bg-slate-200"
            }`}
        >
            {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
    );
}
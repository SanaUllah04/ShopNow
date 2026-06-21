"use client";

import { create } from "zustand";

type CartItem = { _id: string; name: string; price: number; image: string; qty: number };

type CartState = {
    items: CartItem[];
    add: (item: Omit<CartItem, "qty">) => void;
    remove: (_id: string) => void;
    setQty: (_id: string, qty: number) => void;
    clear: () => void;
    totalItems: () => number;
    hydrate: () => void;
};

export const useCart = create<CartState>((set, get) => ({
    items: [],
    hydrate: () => {
        const raw = localStorage.getItem("cart");
        if (raw) set({ items: JSON.parse(raw) });
    },
    add: (item) => {
        const items = [...get().items];
        const found = items.find(i => i._id === item._id);
        if (found) found.qty += 1;
        else items.push({ ...item, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(items));
        set({ items });
    },
    remove: (_id) => {
        const items = get().items.filter(i => i._id !== _id);
        localStorage.setItem("cart", JSON.stringify(items));
        set({ items });
    },
    setQty: (_id, qty) => {
        const items = [...get().items].map(i => i._id === _id ? { ...i, qty } : i);
        localStorage.setItem("cart", JSON.stringify(items));
        set({ items });
    },
    clear: () => {
        localStorage.setItem("cart", JSON.stringify([]));
        set({ items: [] });
    },
    totalItems: () => get().items.reduce((acc, item) => acc + item.qty, 0)
}));
import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockData";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category")?.trim();

    const filter: any = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = { $regex: `^${category}$`, $options: "i" };

    const products = mockDb.products.find(filter);
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const body = await req.json();
    const created = mockDb.products.create(body);
    return NextResponse.json(created, { status: 201 });
}
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function  GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: 'Milk', price: 2.5},
        { id: 2, name: 'Bread', price: 3.5},
        { id: 3, name: 'Cheese', price: 4.5},
        { id: 4, name: 'Apples', price: 1.5},
    ])
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    return NextResponse.json({ id: 3, name: validation.data.name, price: validation.data.price}, {status: 201});
}

export async function PUT(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    return NextResponse.json({ id: 3, name: validation.data.name, price: validation.data.price}, {status: 201});
}
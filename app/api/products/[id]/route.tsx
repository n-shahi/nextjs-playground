import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
    params: { id: number}
}

export async function  GET(request: NextRequest, {params} : Props) {
    if (params.id > 10)
        return NextResponse.json({ error: 'Product not found' }, {status: 404})

    return NextResponse.json({ id: params.id, name: 'Milk', price: 10})
}

export async function PUT(request: NextRequest, {params} : Props) {
    const body = await request.json();

    console.log('Received PUT request:', body);

    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    if (params.id > 10)
        return NextResponse.json({ error: 'Product not found' }, {status: 404})
    
    return NextResponse.json({ id: 1, name: validation.data.name, price: validation.data.price }, {status: 200});
}

export async function DELETE(request: NextRequest, {params} : Props) {
    const body = await request.json();
    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})

    return NextResponse.json({ id: 1, name: body.name }, {status: 200});
}

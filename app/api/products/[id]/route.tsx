import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
    params: { id: string}
}

export async function  GET(request: NextRequest, {params} : Props) {
    const prodcut = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
        select: { name: true, price: true },
    })
    if (!prodcut)
        return NextResponse.json({ error: 'Product not found' }, {status: 404})

    return NextResponse.json(prodcut)
}


export async function PUT(request: NextRequest, {params} : Props) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    const product = await prisma.product.findUnique({ where: { id: parseInt(params.id )} })
    if (!product)
        return NextResponse.json({ error: 'Product not found' }, {status: 404})

    const updatedProduct = await prisma.product.update({
        where: { id: parseInt(params.id) },
        data: { name: body.name, price: body.price},
    })
    return NextResponse.json(updatedProduct)
}


export async function DELETE(request: NextRequest, {params} : Props) {
    const product = await prisma.product.findUnique({ where: { id: parseInt(params.id) } })
    if (!product)
        return NextResponse.json({ error: 'Product not found' }, {status: 404})

    const deletedProduct = await prisma.product.delete({ where: { id: parseInt(params.id) } })
    return NextResponse.json(deletedProduct)
}

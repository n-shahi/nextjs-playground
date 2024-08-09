import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function  GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log('Received POST request:', body);
    const validation = schema.safeParse(body);

    // if (!body.name)
    //     return NextResponse.json({ error: 'Name is required' }, {status: 400});

    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, {status: 400});

    return NextResponse.json({ message: 'Data received successfully' }, {status: 201});
}
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function  GET(request: NextRequest) {
    // return NextResponse.json('Hello World')
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return NextResponse.json([
        { id: 1, name: 'Nabin Shahi'},
        { id: 2, name: 'Suresh Kumar'},
        { id: 3, name: 'Ramesh Kumar'}
    ])
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
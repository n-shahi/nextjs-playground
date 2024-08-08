import { NextRequest, NextResponse } from "next/server";

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
    if (!body.name)
        return NextResponse.json({ error: 'Name is required' }, {status: 400});

    // save data to db
    return NextResponse.json({ message: 'Data received successfully' }, {status: 201});
}
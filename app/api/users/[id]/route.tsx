import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number}
}

export async function  GET(request: NextRequest, {params} : Props) {
    // fetch data from db
    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})

    return NextResponse.json({ id: params.id, name: 'Nabin Shahi'})
}

export async function PUT(request: NextRequest, {params} : Props) {
    // validate the request parameters
    // if invalid, return 400
    // Fetch the user with the given id
    // If user doesn't exist, return 404
    // Update the user
    // Return 200 with updated user data
    const body = await request.json();
    console.log('Received PUT request:', body);
    console.log('Request parameters:', params)

    if (!body.name)
        return NextResponse.json({ error: 'Name field is required.' }, {status: 400});

    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, {status: 404})
    return NextResponse.json({ id: 1, name: body.name }, {status: 200});
}

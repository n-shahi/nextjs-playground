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
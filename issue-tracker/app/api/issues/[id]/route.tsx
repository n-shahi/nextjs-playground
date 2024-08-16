import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validation_schema";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";


export async function PATCH(request: NextRequest, {params: {id}}: { params: {id: string}}) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    const data = await request.json();

    const validation = issueSchema.safeParse(data)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title: data.title || issue.title,
            description: data.description || issue.description,
        }
    })
    return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(request: NextRequest, {params: {id}}: { params: {id: string}}) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    await prisma.issue.delete({
        where: { id: parseInt(id) },
    })
    return NextResponse.json(issue, { status: 200 })
}
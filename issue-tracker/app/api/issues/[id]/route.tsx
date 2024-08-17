import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/app/validation_schema";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";


export async function PATCH(request: NextRequest, {params: {id}}: { params: {id: string}}) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const data = await request.json();

    const validation = patchIssueSchema.safeParse(data)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })
    
    const { assignToUserId, title, description } = data;
    if (assignToUserId) {
        const assignUser = await prisma.user.findUnique({where: { id: assignToUserId }})
        if (!assignUser) return NextResponse.json({ error: 'Invalid user' }, { status: 404 })
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title: title || issue.title,
            description: description || issue.description,
            assignToUserId: assignToUserId || issue.assignToUserId,
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
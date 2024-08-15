import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validation_schema";

export async function GET(request: NextRequest) {
    const issues = await prisma.issue.findMany()
    return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    const validation = issueSchema.safeParse(data)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })
    
    const newIssue = await prisma.issue.create({
        data: {
            title: data.title,
            description: data.description,
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}


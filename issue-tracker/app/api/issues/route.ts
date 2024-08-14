import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validation_schema";
import delay from 'delay';


export async function POST(request: NextRequest) {
    const data = await request.json();
    await delay(3000);
    
    const validation = createIssueSchema.safeParse(data)
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
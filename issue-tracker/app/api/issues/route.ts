import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const schema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest) {
    const data = await request.json();

    const validation = schema.safeParse(data)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, { status: 400 })

    const newIssue = await prisma.issue.create({
        data: {
            title: data.title,
            description: data.description,
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}
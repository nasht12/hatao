import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
    const { rows } = await sql`SELECT * FROM lists LIMIT 100;`;
    return NextResponse.json(rows, { status: 200 });
}

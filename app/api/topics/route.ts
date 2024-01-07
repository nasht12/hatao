import { NextResponse } from "next/server";
import { fetchTopicsFromDb } from "../../actions";

export async function GET(request: Request) {
    const topics = await fetchTopicsFromDb();
    return NextResponse.json({ topics }, { status: 200 });
}

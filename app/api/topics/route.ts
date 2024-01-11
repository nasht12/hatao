import { NextResponse } from "next/server";
import { fetchTopicsFromDb } from "../../actions";

export async function GET(request: Request) {
    return NextResponse.json({ a: "Topics" }, { status: 200 });
}

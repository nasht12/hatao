import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function GET(request: Request) {
  // const { rows } = await sql`SELECT * FROM lists LIMIT 100;`;
  let data = await supabase.from("lists").select("*");
  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from('lists')
    .insert([body]);

  if (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

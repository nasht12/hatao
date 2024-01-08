import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function GET(request: NextRequest) {
    // const { campaignName } = await request.json(); // Extract campaignName from the request body
    let campName = request.nextUrl.searchParams.get('campaignName');
    console.log('campName', typeof(campName));
    let { data, error } = await supabase
      .from("lists")
      .select("*")
      .eq("campaignName", campName); // Filter rows where campaignName matches
  
    if (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }

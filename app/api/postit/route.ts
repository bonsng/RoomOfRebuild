import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PostIt from "@/models/PostIt";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const notes = await PostIt.find({});
    return new Response(JSON.stringify({ success: true, notes }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newNote = await PostIt.create(body);
    console.log(body);
    if (!newNote) {
      return new Response(
        JSON.stringify({ success: false, error: "Request body is missing" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: newNote }), {
      status: 201,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

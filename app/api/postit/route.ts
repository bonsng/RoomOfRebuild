import dbConnect from "@/lib/dbConnect";
import PostIt from "@/models/PostIt";

export async function GET() {
  try {
    await dbConnect();
    const postitList = await PostIt.find();

    return Response.json({ notes: postitList });
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}

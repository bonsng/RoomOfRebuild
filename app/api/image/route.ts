// import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
// const Bucket = process.env.AMPLIFY_BUCKET!;
//
// const s3 = new S3Client({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

export async function GET() {
  try {
    // const command = new ListObjectsV2Command({
    //   Bucket: Bucket,
    //   Prefix: "example-photo-album/",
    // });
    // const { Contents } = await s3.send(command);
    const Contents = Array.from({ length: 11 }, (_, i) => ({
      Key: `/albumImages/${i + 1}.jpg`,
    }));

    if (!Contents) {
      return Response.json({ images: [] });
    }

    const imagesArray = Contents.map((item, index) => ({
      id: `${index + 1}`, // 유니크한 ID 생성
      alt: `Image${index + 1}`,
      caption: `Description for image ${index + 1}`,
      src: `${item.Key}`,
    }));

    return Response.json({ images: imagesArray }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

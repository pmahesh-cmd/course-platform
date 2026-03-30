export async function GET() {
  return Response.json([
    {
      id: "1",
      title: "React Course",
      video: "https://www.youtube-nocookie.com/embed/SqcY0GlETPk"
    },
    {
      id: "2",
      title: "JavaScript Course",
      video: "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg"
    }
  ]);
}
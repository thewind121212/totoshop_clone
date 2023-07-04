import { NextApiRequest } from "next";

let count = 1

export async function GET(req: Request) {


  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
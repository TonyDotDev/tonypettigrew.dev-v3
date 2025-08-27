import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    // Basic security checks
    const userAgent = request.headers.get("user-agent");
    const referer = request.headers.get("referer");
    const origin = request.headers.get("origin");

    // Only allow downloads from your domain or localhost for development
    const allowedOrigins = [
      "https://tonypettigrew.dev",
      "https://www.tonypettigrew.dev",
      "http://localhost:3000",
      "http://localhost:3001",
    ];

    const isAllowedOrigin = allowedOrigins.some(
      (allowed) => referer?.includes(allowed) || origin?.includes(allowed),
    );

    if (!isAllowedOrigin) {
      console.log(`Blocked resume download attempt from: ${referer || origin}`);
      return new Response("Unauthorized", { status: 403 });
    }

    // Basic rate limiting (simple approach)
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    console.log(
      `Resume download request from IP: ${clientIP}, User-Agent: ${userAgent}`,
    );

    // Path to resume file (outside public directory)
    const resumePath = path.join(
      process.cwd(),
      "private",
      "Tony_Pettigrew_-_Frontend_Engineer.pdf",
    );

    // Check if file exists
    try {
      await fs.access(resumePath);
    } catch {
      console.error("Resume file not found:", resumePath);
      return new Response("Resume not found", { status: 404 });
    }

    // Read and serve the file
    const fileBuffer = await fs.readFile(resumePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Tony_Pettigrew_Resume.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

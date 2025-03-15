import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get("authorization");
    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Missing encrypted data or authorization header" },
        { status: 400 }
      );
    }
    const body = await request.json();
    const { token } = body.data;
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/userauth/users/gettotpsecret/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authorizationHeader,
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      const secret = responseData.data;
      const isValid = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token,
        window: 1,
      });
      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "Invalid Code" },
          { status: 400 }
        );
      }
      return NextResponse.json({ message: "Code verified!" }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to Verify Code" },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

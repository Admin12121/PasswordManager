import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { auth } from "@/auth"

function xorEncryptDecrypt(data: string, key: string) {
  return Array.from(data)
    .map((char: string, index: number) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join("");
}

function encryptData(data: Record<string, any>, key: string): string {
  const token = key.slice(0, 32);
  const jsonData = JSON.stringify(data);
  const encrypted = xorEncryptDecrypt(jsonData, token);
  return btoa(encrypted);
}

function decryptData(encryptedData: string, key: string): Record<string, any> {
  const token = key.slice(0, 32);
  const decodedData = atob(encryptedData);
  const decrypted = xorEncryptDecrypt(decodedData, token);
  return JSON.parse(decrypted);
}

export async function GET(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get("authorization");
    if (!authorizationHeader) {
      return NextResponse.json(
        { error: "Missing encrypted data or authorization header" },
        { status: 400 }
      );
    }

    const token = authorizationHeader.replace("Bearer ", "");
    const key = token.slice(0, 32);
    const session = await auth()
    const issuer = encodeURIComponent("Password Manager");
    const accountName = encodeURIComponent("https://pm.biki.com.np");
    const logoUrl = encodeURIComponent("https://pm.biki.com.np/profile.png");

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "User email is missing" },
        { status: 400 }
      );
    }

    const secret = speakeasy.generateSecret({
      length: 20,
      name: session.user.email!,
    });

    const otpauthUrl = `otpauth://totp/${issuer}:${accountName}?secret=${secret.base32}&issuer=${issuer}&image=${logoUrl}`;
    
    const qrCodeData = await QRCode.toDataURL(otpauthUrl);
    
    const normdata = {
      secret: secret.base32,
      qrCode: qrCodeData,
    };
    
    const data = encryptData(normdata, key);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
    const encryptedData = body.data;
    const token = authorizationHeader.replace("Bearer ", "");
    const key = token.slice(0, 32);
    const decryptedData = decryptData(encryptedData, key);
    const isValid = speakeasy.totp.verify({
      secret: decryptedData.secret,
      encoding: "base32",
      token: decryptedData.token,
      window: 1,
    });
    if (isValid) {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userauth/users/totpsecret/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authorizationHeader,
          },
          body: JSON.stringify({
            ...decryptedData,
          }),
        }
      );
      if (response.ok) {
        return NextResponse.json(
          { data: { success: "App added" } },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to Add app" },
          { status: response.status }
        );
      }
    } else {
      return NextResponse.json({ error: "Failed to verify" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

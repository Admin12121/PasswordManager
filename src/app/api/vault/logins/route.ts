import { NextRequest, NextResponse } from "next/server";

function xorEncryptDecrypt(data: string, key: string) {
  return Array.from(data)
    .map((char: string, index: number) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join("");
}

function decryptData(encryptedData: string, key: string): Record<string, any> {
  const token = key.slice(0, 32);
  const decodedData = atob(encryptedData);
  const decrypted = xorEncryptDecrypt(decodedData, token);
  return JSON.parse(decrypted);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const encryptedData = body.data;
    const authorizationHeader = request.headers.get("authorization");

    if (!encryptedData || !authorizationHeader) {
      return NextResponse.json(
        { error: "Missing encrypted data or authorization header" },
        { status: 400 }
      );
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const key = token.slice(0, 32);
    const decryptedData = decryptData(encryptedData, key);
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/vault/logins/`,
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
        { data: { mesage: "Login Data Saved" } },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to create Login" },
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const encryptedData = body.data;
    const authorizationHeader = request.headers.get("authorization");
    if (!encryptedData || !authorizationHeader) {
      return NextResponse.json(
        { error: "Missing encrypted data or authorization header" },
        { status: 400 }
      );
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const key = token.slice(0, 32);
    const decryptedData = decryptData(encryptedData, key);
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/vault/logins/${decryptedData.id}`,
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
        { data: { success: "Logins Updated" } },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Logins Failed to Update" },
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

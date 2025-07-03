import { NextResponse } from "next/server";
import { DB_URL } from "@/app/lib/config";
import { UserProps } from "@/app/types/user";
import { signJwt } from "@/app/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "ユーザー名とパスワードは必須です。" }, { status: 400 });
  }

  if (!DB_URL) {
    throw new Error("エンドポイントエラー");
  }

  try {
    const res = await fetch(DB_URL);
    const users: UserProps[] = await res.json();
    const user: UserProps | undefined = users.find((u:UserProps) => u.username === username && u.password === password);
    
    if (!user) {
      return NextResponse.json({ message: "ユーザー名またはパスワードが間違っています" }, { status: 400 });
    }

    const token = signJwt({ id: user.id, username: user.username });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60*60,
      path: "/"
    });
    return NextResponse.json({}, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { DB_URL } from "@/app/lib/config";
import { UserProps } from "@/app/types/user";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "ユーザー名とパスワードは必須です。" }, { status: 500 });
  }

  if (!DB_URL) {
    console.error("エンドポイントエラー");
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }

  try {
    const res = await fetch(DB_URL);
    const users: UserProps[] = await res.json();
    const user: UserProps | undefined = users.find((u:UserProps) => u.username === username && u.password === password);
    return user
      ? NextResponse.json({ message: "ログインしました。" })
      : NextResponse.json({ message: "ユーザー名またはパスワードが間違っています。" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }
}
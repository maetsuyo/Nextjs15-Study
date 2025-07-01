import { NextResponse } from "next/server";
import { UserProps } from "@/app/type/user";

const DB_URL = process.env.DB_URL

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!DB_URL) {
    console.error("エンドポイントエラー");
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }

  try {
    const res = await fetch(DB_URL);
    const users: UserProps[] = await res.json();
    const user: UserProps | undefined = users.find((u:UserProps) => u.username === username && u.password === password);
    return user ? NextResponse.json({ message: "ログイン成功" }) : NextResponse.json({ message: "ログイン失敗" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }
}
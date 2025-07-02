import { NextResponse } from "next/server";
import { UserProps } from "@/app/types/user";
import { DB_URL } from "@/app/lib/config";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "ユーザー名とパスワードは必須です。" }, { status: 400 });
  }

  if (!DB_URL) {
    console.error("エンドポイントエラー");
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }

  try {
    const res = await fetch(DB_URL);
    const users: UserProps[] = await res.json();
    const isExistUser: UserProps | undefined = users.find((u:UserProps) => u.username === username);
    if (isExistUser) {
      return NextResponse.json({ message: "このユーザー名は既に使用されています。"}, { status: 400})
    }

    const newUser: Omit<UserProps, "id"> = {
      username: username,
      password: password
    };

    const regiRes = await fetch(DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })

    return regiRes.ok
      ? NextResponse.json({ message: "新規登録しました。"})
      : NextResponse.json({ message: "エラー"}, { status: 500});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "エラー" }, { status: 500 });
  }
}
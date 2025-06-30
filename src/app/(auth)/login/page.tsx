"use client"

import { useState } from "react";

type UserProps = {
  id: number;
  username: string;
  password: string;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/users");
      const users: UserProps[] = await res.json();
      const user: UserProps | undefined = users.find((u:UserProps) => u.username === username && u.password === password);

      if (user) {
        setMessage("ログイン成功");
      } else {
        setMessage("ログイン失敗");
      }
    } catch (e) {
      console.error(e);
      setMessage("エラー");
    }
  }
  return (
    <div>
      <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <p>ユーザー名</p>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>パスワード</p>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          ログイン
        </button>
      </form>
      </div>
      {message && (
        <p>{message}</p>
      )}
    </div>
  );
}
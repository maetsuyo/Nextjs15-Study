"use client"

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      setMessage(data.message);
    } catch(e) {
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
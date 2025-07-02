"use client"

import { useState } from "react";
import AuthFormComponent from "../components/AuthForm";

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
    } catch(err) {
      console.error(err);
      setMessage("エラー");
    }
  }
  return (
    <AuthFormComponent
      title="ログイン"
      message={message}
      username={username}
      password={password}
      onChangeUsername={(e) => setUsername(e.target.value)}
      onChangePassword={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
    />
  );
}
"use client"

import { useState } from "react";
import AuthFormComponent from "../components/AuthForm";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
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
    <AuthFormComponent
      title="新規登録"
      message={message}
      username={username}
      password={password}
      onChangeUsername={(e) => setUsername(e.target.value)}
      onChangePassword={(e) => setPassword(e.target.value)}
      onSubmit={handleRegister}
    />
  );
}
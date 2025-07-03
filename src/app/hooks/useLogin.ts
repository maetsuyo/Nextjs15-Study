"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

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

      if (res.ok) {
        router.push("/profile");
      } else {
        setMessage(data.message);
      }
    } catch(err) {
      console.error(err);
      setMessage("エラー");
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleLogin
  };
}
"use client";

import AuthFormComponent from "../components/AuthForm";
import { useLogin } from "@/app/hooks/useLogin";

export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleLogin
  } = useLogin();
  
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
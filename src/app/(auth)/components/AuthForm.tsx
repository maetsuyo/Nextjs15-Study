import { AuthFormProps } from "@/app/types/authForm";

export default function AuthFormComponent({
  title,
  message,
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onSubmit,
}: AuthFormProps) {
  return (
    <div>
      <div>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <p>ユーザー名</p>
        <input
          type="text"
          value={username}
          placeholder="username"
          required
          onChange={onChangeUsername}
        />
        <p>パスワード</p>
        <input
          type="password"
          value={password}
          placeholder="password"
          required
          onChange={onChangePassword}
        />
        <button type="submit">
          {title}
        </button>
      </form>
      </div>
      {message && (
        <p>{message}</p>
      )}
    </div>
  );
}
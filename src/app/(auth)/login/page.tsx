function Login() {
  return (
    <div>
      <form action="">
        <p>ユーザーネーム</p>
        <input type="text" name="username" placeholder="username"/>
        <p>パスワード</p>
        <input type="text" name="password" placeholder="password"/>
      </form>
      <button type="submit">
        ログイン
      </button>
    </div>
  );
}

export default Login;
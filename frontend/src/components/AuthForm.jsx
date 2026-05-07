function AuthForm({
  authMode,
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  register,
  login,
  setAuthMode,
}) {
  return (
    <div className="authCard">
      <h1>{authMode === "login" ? "Login" : "Register"}</h1>
      <p>Welcome to Student Task Planner</p>

      {authMode === "register" && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <button onClick={authMode === "login" ? login : register}>
        {authMode === "login" ? "Login" : "Register"}
      </button>

      <button
        className="linkBtn"
        onClick={() =>
          setAuthMode(authMode === "login" ? "register" : "login")
        }
      >
        {authMode === "login"
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default AuthForm;
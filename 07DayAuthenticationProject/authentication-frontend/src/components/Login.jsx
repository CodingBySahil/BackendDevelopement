const Login = () => {
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter your email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" placeholder="Enter your password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

function LoginPage() {
  return (
    <form>
      <input id="email" name="email" type="email" required/>
      <label htmlFor="email">Email</label>

      <input id="password" name="password" type="password" required/>
      <label htmlFor="password">Password</label>

      <button type="button" id="submit">Submit</button>
    </form>
  );
}

export default LoginPage;

function Spa() {
  // Check if the JWT token is present and valid in cookies
  const isAuthenticated = () => {
    const token = getCookie("token"); // Replace 'token' with your cookie name

    if (token) {
      // Perform token validation here (e.g., check expiration, decode)
      // If the token is valid, return true; otherwise, return false
      return true;
    }

    return false;
  };

  // Function to get a specific cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }

    return null;
  }

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <ReactRouterDOM.Redirect to="/login/" />
          )
        }
      />
    );
  };

  return (
    <HashRouter>
      <div>
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <ProtectedRoute path="/deposit/" component={Deposit} />
          <ProtectedRoute path="/withdraw/" component={Withdraw} />
          <ProtectedRoute path="/balance/" component={Balance} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));

const apiUrl = "http://localhost:3000";

function NavBar() {
  // State to store the user's name
  const [userName, setUserName] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userEmail = tokenPayload.email; // Email address from the token
      console.log(userEmail);
      // Fetch the user's full name based on their email address
      fetch(`${apiUrl}/account/findOne/${userEmail}`)
        .then((response) => response.json())
        .then((userData) => {
          if (userData.name) {
            setUserName(userData.name);
            setAuthenticated(true); // Set authenticated to true when user is logged in
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  // Function to get cookie value by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token or perform any other logout actions
    // For example, remove the token from cookies or local storage
    // and redirect the user to the logout page or homepage
    // Here, we'll simply reload the page to clear the state
    // Remove the token from cookies
    localStorage.removeItem("token");

    // Redirect the user to the login page
    window.location.href = "#/login";
    window.location.reload();
  };

  // Use an effect to update the authentication status
  React.useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    setAuthenticated(!!token);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav justify-content-between mx-auto">
            {userName ? (
              // Render the user's name if it exists
              <li className="nav-item mx-4">
                <span className="nav-link">Welcome, {userName}</span>
              </li>
            ) : null}
            <li className="nav-item mx-4">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
            {authenticated ? (
              // Render the "Logout" link if authenticated
              <li className="nav-item mx-4">
                <a className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            ) : (
              // Render the "Login" link if not authenticated
              <li className="nav-item mx-4">
                <a className="nav-link" href="#/login/">
                  Login
                </a>
              </li>
            )}

            <li className="nav-item mx-4">
              <a className="nav-link" href="#/deposit/">
                Deposit
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link" href="#/withdraw/">
                Withdraw
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link" href="#/balance/">
                Balance
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link" href="#/alldata/">
                AllData
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

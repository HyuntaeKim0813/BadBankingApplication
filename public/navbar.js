function NavBar() {
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
            <li className="nav-item mx-4">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link" href="#/login/">
                Login
              </a>
            </li>
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
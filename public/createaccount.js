const apiUrl = "http://localhost:3000";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [isCustomerAccount, setIsCustomerAccount] = React.useState(false);
  const [isEmployeeAccount, setIsEmployeeAccount] = React.useState(false);

  // Function to generate a random account number
  function generateRandomAccountNumber() {
    const min = 1000000000; // Minimum account number
    const max = 9999999999; // Maximum account number
    const randomAccountNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;
    return randomAccountNumber.toString(); // Convert it to a string
  }

  function handle() {
    const generatedAccountNumber = generateRandomAccountNumber(); // Generate the random account number

    console.log("User Account Selected:", isCustomerAccount);
    console.log("Employee Account Selected:", isEmployeeAccount);

    const selectedCheckboxes = [];
    if (isCustomerAccount) {
      selectedCheckboxes.push("customer");
    }
    if (isEmployeeAccount) {
      selectedCheckboxes.push("employee");
    }
    const selectedCheckboxesStr = selectedCheckboxes.join(","); // Convert to comma-separated string
    console.log("Selected Checkboxes String:", selectedCheckboxesStr); // Log the selectedCheckboxesStr

    console.log(
      name,
      email,
      password,
      generatedAccountNumber,
      selectedCheckboxesStr
    );

    const url = `${apiUrl}/account/create/${name}/${email}/${password}/${generatedAccountNumber}/${selectedCheckboxesStr}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <div className="d-flex ">
        <div className="px-2">
          <input
            type="checkbox"
            id="customerAccount"
            name="customerAccount"
            value="customerAccount"
            checked={isCustomerAccount}
            onChange={() => setIsCustomerAccount(!isCustomerAccount)}
          />
          <label htmlFor="customerAccount" className="px-2">
            User Account
          </label>
        </div>
        <div className="px-2">
          <input
            type="checkbox"
            id="employeeAccount"
            name="employeeAccount"
            value="employeeAccount"
            checked={isEmployeeAccount}
            onChange={() => setIsEmployeeAccount(!isEmployeeAccount)}
          />
          <label htmlFor="employeeAccount" className="px-2">
            Employee Account
          </label>
        </div>
      </div>
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Create Account
      </button>
    </>
  );
}

function Home() {
  return (
    <Card
      className="w-100" // Add the w-100 class here
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the Bad Bank Application"
      text="You can move around using the navigation bar."
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}

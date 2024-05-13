function Home(){
  const ctx = React.useContext(UserContext);
  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Bad Bank"
      title="Welcome to the bank"
      text="use the navbar to browse"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
   

  );  
}

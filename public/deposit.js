//shoots back error, may have something to do with the routes? does not update database
function Deposit(){
  const [amount, setAmount]           = React.useState('');
  const [show, setShow]               = React.useState(true);
  const [email, setEmail]             = React.useState('');
  const [isValid, setIsValid]         = React.useState('');

 const firebaseConfig = {
  apiKey: "AIzaSyAvW9f-BhUxjuIP1bVk7GSN6ozd8_gmizE",
  authDomain: "badbankauthentication.firebaseapp.com",
  projectId: "badbankauthentication",
  storageBucket: "badbankauthentication.appspot.com",
  messagingSenderId: "379845993451",
  appId: "1:379845993451:web:ea2907e725805b6414afae"
};
if (firebase.apps.length === 0){
firebase.initializeApp(firebaseConfig);
}



 
  //Logic to add deposit amount from deposit to total state
  function handleSubmit(){ 
    console.log(email,amount);
    firebase.auth().currentUser.getIdToken()
      .then(idToken => {
        fetch(`/account/update/${email}/${balance}`,{
          method: 'GET',
          headers: {
            'Authorization' : idToken
          }
        })
        .then(response => response.json())
         .then(data => {
          console.log(data);
            setAmount('');
            setShow(false);
            try {
              const data = JSON.parse(Number(text));
              props.setStatus(JSON.stringify(data.value));
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
    })
    })}
  //this checks if deposit is negative - you can't submit  
const handleChange = (event) =>{
  if (Number(event.target.value) <= 0){
    setIsValid(true)}
    else setIsValid(false);
    setAmount(Number(event.target.value));
  }
   
  //when the deposit is successful
  function clearForm(){
    setAmount('');
    setShow(true);
  }

  return (
    <Card
   bgcolor="secondary"
   txtcolor="white"
   header="Deposit"
   body={show ? (  
           <>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value = {email} onChange={e => setEmail(e.currentTarget.value)}/><br></br>
          Amount   
          <input type="number"  className="form-control" id="deposit"  placeholder = "$0.00" value= {amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
          <button type="submit" disabled={isValid} className="btn btn-light" onClick={handleSubmit}> Make deposit
          </button> 
          </>
          ):(
             <><h5>Success! Your Current Balance: ${amount} USD</h5><button variant="primary" className="btn btn-light" type="submit" onClick={handleChange}> Deposit again
             </button></>
          )}

      />
      )
      }
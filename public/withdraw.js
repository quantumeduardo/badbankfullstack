function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

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

  
  return (
    <Card
      bgcolor="secondary"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  );

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    console.log(email, amount);
    firebase.auth.currentUser.getIdToken().then(idToken => {
      fetch(`/account/update/${email}/-${amount}`,
      {
        method: 'GET',
        headers: {
          'Authorization' :idToken
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setAmount('')
      setShow(false);
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Withdraw failed')
            console.log('err:', text);
        }
      })})}

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="$0.00" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
}
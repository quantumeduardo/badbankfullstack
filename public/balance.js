//Balance is showing up, except that it is not updating the balance within the database
function Balance(){
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
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}



function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus({data});
            props.setShow(false);
            setBalance(data.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}
function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}
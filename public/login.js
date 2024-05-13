//How can I create the logout functionality? also how can I make the user appear within the navbar?
function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
 
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  );

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

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
 function handle(){
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, password);
    console.log('loggedin')
    props.setStatus('');
    props.setShow(false);
    
    promise.catch(e => {
    props.setStatus('Login Failure')
  });}


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);


 
}

}

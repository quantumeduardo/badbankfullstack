//All works, just add the login option right after loggin in
function CreateAccount(){
  const [show, setShow] = React.useState(true);
  const [name,setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [status, setStatus] = React.useState('');

  
  



  function handleCreate(){
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

    function validate(field,label){
      if (!field) {
            setStatus(<div style={{color:'red'}}> enter a valid {label} </div>);
            setTimeout(() => setStatus(''),3000);
            return false;
          }
          return true;
        } 
    
    console.log(name,email,password,balance);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validate(balance, 'balance')) return;
    const url =`/account/create/${name}/${email}/${password}/${balance}`;
      (async()=> {
        var res = await fetch(url)
        var data = await res.json();
        console.log(data);
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(({message}) => console.log(message))
      })();
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setBalance('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
              
              <br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange = {e => setPassword(e.currentTarget.value)}/>
            
              <br/>
              Amount to deposit
              <input type="number" className="form-control" id = "balance" placeholder="$0.000" value = {balance} onChange ={e => setBalance(e.currentTarget.value)} /><br></br>
              <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button> 
              </>
            ):(
              <>
              <h5>Success!</h5>
              <a href="#/login/" className="btn btn-primary active" tabIndex="-1" role="button" aria-disabled="false">Login</a>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Create Another Account</button>
              
              </>
            )}
    />
  )
}

  
  
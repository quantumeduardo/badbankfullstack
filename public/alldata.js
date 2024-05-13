//May delete, not useful in this application  
function AllData(){
  const [data,setData] = React.useState('');

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


  React.useEffect(() => {
    // fetch all accounts from API
    firebase.auth().currentUser.getIdToken()
      .then(idToken => {
        fetch('/account/all'),
        {
          method: 'GET',
          headers: {
            'Authorization' : idToken
          }

        } 
      })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(JSON.stringify(data.balance));
    });
  }, []);

  return (
    <>
    <h5>All Users</h5>
    {data}
    </>
  );
}
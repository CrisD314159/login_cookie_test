import express, { json } from 'express';
import pkg from 'express-oauth2-jwt-bearer';
const auth = pkg.auth;

const app = express();
app.use(json());

const jwtCheck = auth({
  audience: 'https://example-api/',
  issuerBaseURL: 'https://dev-xaup6vftdaa5ann3.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});


const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', async (req, res)=>{
  const {user, password} = req.body
  console.log(user);
  if(user === 'admin' && password === 'admin'){
    const options = await fetch('https://dev-xaup6vftdaa5ann3.us.auth0.com/oauth/token',
      {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: `{"client_id":"87PsUym8lnnKdLscrZ3SGBvYoxU0KoJU","client_secret":"3pUFW5oSue0NpIlT7APuRmXinR9cubHchfMb3aWw5PrsWhupORzcy3buGOmrerB5","audience":"https://example-api/","grant_type":"authorization_code","scope":"offline_access"}`

      }
    )
    const data = await options.json();

    console.log(data);
    return res.send('Logged in');
    
  }
  return res.send('Invalid credentials');
})


app.get('/private', jwtCheck, (req, res) => {
  res.send(JSON.stringify({message: 'Private route'}));
});

app.post('/refresh-token', async (req, res) => {
  console.log(req.body);
  const { refresh_token } = req.body;
  console.log(refresh_token);

  const options = await fetch('https://dev-xaup6vftdaa5ann3.us.auth0.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `{"client_id":"87PsUym8lnnKdLscrZ3SGBvYoxU0KoJU","client_secret":"3pUFW5oSue0NpIlT7APuRmXinR9cubHchfMb3aWw5PrsWhupORzcy3buGOmrerB5","audience":"https://example-api/","grant_type":"authorization_code","refresh_token":"${refresh_token}","scope":"offline_access"}`

     
  });

  const data = await options.json();
  console.log(data);
  const { access_token } = data;
  console.log('New Access Token:', access_token);

  return res.json({ access_token });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

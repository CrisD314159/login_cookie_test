import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { user, password } = req.body;
  if(!user || !password){
 
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  if(user === 'root' && password === 'admin'){
    const token =  jwt.sign({user, password}, process.env.JWT_SECRET, {expiresIn: '10m'});
    return res.cookie('auth', token, 
      {
        httpOnly: true,
        secure: true, // Requiere HTTPS
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
       
      }).status(201).json({ message: 'Logged in' , user:{user:'root', password:'admin'}});
   
  }
  return res.json({ message: 'Invalid credentials' });
}
export const logout = async (req, res) => {
  res.clearCookie('auth');
  return res.status(200).json({ message: 'Logged out' });
}
export const publicService = async (req, res) => {
  const { user, password } = req.body;
  console.log(user);
}
export const privateService = async (req, res) => {
  console.log(req.user);
  return res.status(200).json({ message: 'You have access to the Private service' });
}

export const checkAuthStatus = async (req, res) => {
  if (req.user) {
    return res.status(200).json({ message: 'Authenticated' });
  }
  return res.status(401).json({ message: 'Unauthorized' });

}
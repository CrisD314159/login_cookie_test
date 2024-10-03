import jwt from "jsonwebtoken"
export const checkAuth = async (req, res, next) => {
  const {auth} = req.cookies;
 
try {
  
  if(!auth){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const check = jwt.verify(auth, process.env.JWT_SECRET);

  if(!check){
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = check.user
  next();
} catch (error) {
  if(error.name === 'TokenExpiredError'){
    return res.status(401).json({ message: 'Token expired' });
  }
  console.log(error);
  return res.status(401).json({ message: 'Unauthorized' });
  
}

}
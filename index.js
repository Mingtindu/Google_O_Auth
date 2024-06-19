import express from 'express'
import passport from './auth.js'
import session from 'express-session';
function isLoggedIn(req,res,next){
    req.user? next():res.sendStatus(401);
}
const app = express()
app.use(session({secret:'meow'}))
app.use(passport.initialize())
app.use(passport.session())
app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err); // Log error for debugging
        return res.status(500).send('Logout failed'); // Inform user about failure
      }
  
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err); // Log error for debugging
          return res.status(500).send('Logout failed'); // Inform user about failure
        }
  
        res.redirect('/'); // Redirect to homepage after successful logout
      });
    });
  });
app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Authentication with google </a>')
})
app.get('/auth/google',
    passport.authenticate('google',{scope:['email','profile']})
)
app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/failure',
    })
)
app.get('/auth/failure',(req,res)=>{
    res.send("something went wrong")
})
app.get('/protected',isLoggedIn,(req,res)=>{
    console.log(req)
    res.send(`Hello ${req.user.displayName}`)
})
app.listen(3000,()=>{
    console.log(`App is running on port 3000`)
})
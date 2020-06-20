const LocalStrategy =require("passport-local");
const bcrypt=require("bcrypt");
function initialize(passport){

    const authenticatedUser=(email,password, done) => {
        const user=getUserByEmail(email);
        if(user === null)
        {
            return done(null,false,{message:"No user with that email found"});
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user);
            }
            else{
                return done(null,false,{message:"Password is incorrect"})
            }
        }
        catch(error){
            return done(error)
        };
    };

    passport.use(
        new LocalStrategy({usernameField : "email"}),
        authenticatedUser
    )
}

module.exports = initialize;
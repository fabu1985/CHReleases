const passport = require('passport')
const local    = require('passport-local')
const { usersModel } = require('../dao/mongo/models/ecommerce.model.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')
const UserDaoMongo = require('../dao/mongo/usersDao.mongo.js')
const LocalStrategy = local.Strategy
const userService = new UserDaoMongo()

exports.initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try{
            const { first_name, last_name, email } = req.body
            let userFound = await userService.getUserBy({email: username})
            if (user) return done(null, false)

            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error al crear un usuario'+error)
        }
    }))
}


///esto es para guardar y recuperar credencialaes del susuarion de sesession
passport.serializeUser((user,done)=> {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserBy({_id: id})
    done(null, user)
})

passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try{
        const user = await userService.getUserBy({email: username})
        if(!user){
            console.log('user not found')
            return done(null, false)
        }
        if(!isValidPassword(password, {password})) return done(null,false)
        return done(null, false)
    } catch (error) {
       return done(error) 
    }
}))
// const GitHubStrategy = require('passport-github2')
// const UserDaoMongo = require('../dao/mongo/usersDao.mongo.js')
// const userService   = new UserDaoMongo() 

/*
exports.initializePassport = () => {
    // una estrategia es un middleware
    
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.9efc6419a3177ebc',
        clientSecret: '08afdf2b6f4d964cdbaa4b91f1c0eee4af0404e8',
        callbackURL: 'http://localhost:4040/api/sessions/githubcallback'
    }, async (accesToken, refreshToken, profile, done)=> {
        try {
            console.log(profile)
            let user = await userService.getUserBy({email: profile._json.email})
            if (!user){
                let userNew = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: '123456'
                }
            let result = await userService.createUser(userNew)
            return done (null, result)
            }
            done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    // guardar y recuperra credenciales del usuario de session

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done)=>{
        let user = await userService.geUsertBy({_id: id})
        done(null, user)
    })
} */

/*
exports.initializePassport = () => {
    // una estrategia es un middleware
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name } = req.body
            let userFound = await userService.geUsertBy({email: username})
            if(userFound) return done(null, false)

            let newUser = {
                first_name, 
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error al crear un usuario: '+error)
        }
    }))

    // guardar y recuperra credenciales del usuario de session



    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        try {
            const user = await userService.geUsertBy({email: username})            
            if(!user) {
                console.log('User not found')
                return done(null, false)
            }
                        
            if(!isValidPassword(password, {password: user.password})) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
    )
}
*/
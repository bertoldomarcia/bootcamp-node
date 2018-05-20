const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = (app) => {
    const Users = app.db.models.Users;
    const config = app.libs.config;

    const params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: config.jwtSecret
    };

    const strategy = new Strategy(params, 
        async(payload, done) => {
            try {
                console.log(payload.id);
                // const users = await Users.findById(2);
                const users = await Users.findById(payload.id);

                if (users) {
                    return done(null, {
                        id: users.id,
                        email: users.email
                    })
                } else {
                    return done(null, false);
                }

            } catch (error) {
                return done(error, null);
            }
        });

        passport.use(strategy);

        return {
            initialize: () => {
                return passport.initialize();
            },
            authenticate: () => {
                return passport.authenticate('jwt', config.jwtSession);
            }
        }

};
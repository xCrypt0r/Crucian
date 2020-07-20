module.exports.load = async bot => {
    const express = require('express');
    const app = express();
    const session = require('express-session');
    const passport = require('passport');
    const Verification = require('passport-discord').Strategy;
    const path = require('path');
    const {
        DASHBOARD_PORT: port = 80,
        CRUCIAN_CLIENTID: clientID,
        CRUCIAN_SECRET: clientSecret,
        EXPRESS_SESSION_SECRET: sessionSecret
    } = process.env;
    const discordOAuthScopes = ['identify', 'email', 'guilds'];

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((obj, done) => done(null, obj));

    passport.use(new Verification({
        clientID,
        clientSecret,
        scope: discordOAuthScopes,
        session: true
    }, (accessToken, refreshToken, profile, done) => {
        let { username, discriminator, id } = profile;

        bot.logger.log(`Dashboard: ${username}#${discriminator} logged in`);

        process.nextTick(() => done(null, profile));
    }));

    if (app.get('env') === 'development') {
        app.locals.pretty = true;
    }

    app
        .use(express.static(path.join(__dirname, '/public')))
        .use(session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: true
        }))
        .use((req, res, next) => {
            res.locals.session = req.session;

            next();
        })
        .use(passport.initialize())
        .use(passport.session())
        .set('views', path.join(__dirname, '/views'))
        .set('view engine', 'pug')
        .get('/', (req, res) => {
            if (!req.isAuthenticated()) {
                res.redirect('/auth');

                return;
            }

            res.render('index');
        })
        .get('/auth', passport.authenticate('discord', {
            scope: discordOAuthScopes,
            permissions: 8
        }))
        .get('/auth/callback', passport.authenticate('discord', {
            failureRedirect: '/',
            successRedirect: '/'
        }))
        .listen(port, err => {
            if (err) {
                bot.logger.error(err);

                return;
            }

            bot.logger.log('Connected to dashboard');
        });
};
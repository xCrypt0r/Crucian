const express = require('express');
const router = express.Router();
const passport = require('passport');
const Verification = require('passport-discord').Strategy;
const {
    CRUCIAN_CLIENTID: clientID,
    CRUCIAN_SECRET: clientSecret
} = process.env;
const discordOAuthScopes = ['identify', 'email', 'guilds'];

module.exports = bot => {
    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((obj, done) => done(null, obj));

    passport.use(new Verification({
        clientID,
        clientSecret,
        scope: discordOAuthScopes,
        session: true
    }, (accessToken, refreshToken, profile, done) => {
        let { username, discriminator, id } = profile;

        bot.logger.log(`Dashboard: ${username}#${discriminator} (${id}) logged in`);

        process.nextTick(() => done(null, profile));
    }));

    router.get('/', passport.authenticate('discord'));

    router.get('/callback', passport.authenticate('discord', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

    return router;
};
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../models/member');
const bcrypt = require('bcrypt');

const router = express.Router();

passport.use(new LocalStrategy(
    { 
      usernameField: 'email',
      passwordField: 'password',
      session: true
    },
    async (email, password, done) => {
      try {
        const user = await Member.findOne({ where: { email: email } });
        
        if (!user) {
          return done(null, false, { message: 'There is no such email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Wrong password' });
        }
        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  ));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Member.findOne({ where: { id } });
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

router.post('/', (req, res, next) => {
    if(req.body.email === '' || req.body.password === ''){
      return res.json({ success: false, message: 'Please fill in the blanks' });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ success: false, message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ success: true, nickname:user.nickname });
        });
        
    })(req, res, next);
});

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ islogined: true, nickname: req.user.nickname });
  } else {
    res.status(200).json({ islogined: false });
  }
});

router.get("/logout", async (req, res, next) => {
	req.logout((err) => {
		req.session.destroy();
    res.clearCookie('connect.sid');
		if (err) {
			res.redirect("/");
		} else {
			res.status(200).send("server ok: 로그아웃 완료");
		}
	});
});

module.exports = router;
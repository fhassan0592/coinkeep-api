import express from 'express';
import jwt from 'jsonwebtoken';

import Auth from '../authentication/Auth';

const router = express.Router();

router.post('/signup', (req, res) => {
    if (!!req.body.auth && !!req.body.auth.username && !!req.body.auth.password) {
        let auth = req.body.auth;
        Auth.findOne({ username: auth.username })
        .then(foundAuth => {
            if (!!foundAuth) return res.status('400').json({ status: 'failure', data: null, message: `Account already exists` });
            new Auth(auth)
            .save((err, savedAuth) => {
                if (err) return res.status('500').json({ status: 'failure', data: null, message: err.message });
                return res.status('200').json({ status: 'success', data: null, message: null })
            });
        })
        .catch(err => res.status('500').json({ status: 'failure', data: null, message: err.message }));
    } else {
        return res.status('400').json({ status: 'failure', data: null, message: `A valid username and password is required to sign up for an account` });
    }
});


router.post('/login', (req, res) => {
    if (!!req.body.auth && !!req.body.auth.username && !!req.body.auth.password) {
        let auth = req.body.auth;
        Auth.findOne({ username: auth.username }).select('username password').exec()
        .then(foundAuth => {
            if (!!foundAuth) {
                let token = jwt.sign({ id: foundAuth.id, username: foundAuth.username }, process.env.JWT_SECRET);
                return res.status('200').json({ status: 'success', data: token, message: null });
            } else {
                return res.status('404').json({ status: 'failure', data: null, message: `Account does not exist` });
            }
        })
        .catch(err => res.status('500').json({ status: 'failure', data: null, message: err.message }));
    } else {
        return res.status('400').json({ status: 'failure', data: null, message: `A valid username and password is required to log in` });
    }
});





export default router;
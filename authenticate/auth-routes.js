const router = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const R = require('ramda');

const apiInfo = require('./credentials/linkedin-api-keys.json');
const secret = require('./secret.js');

const { CLIENT_ID, CLIENT_SECRET } = JSON.parse(JSON.stringify(apiInfo));
const REQUEST_URI = 'http://localhost:3000/api/auth/verifying';


router.get('/home', async (req, res) => {
    res.redirect(`http://localhost:3000/api/auth/verifying?${querystring.stringify(req.query)}`)
})

router.post('/login', async (req, res) => {
    try {
        const { code } = req.body;

        const formData = `grant_type=authorization_code&code=${code}&redirect_uri=${REQUEST_URI}&client_secret=${CLIENT_SECRET}`;
        const contentLength = formData.length;
        const dataA = await
            axios({
                url: 'https://www.linkedin.com/oauth/v2/accessToken',
                method: 'POST',
                headers: {
                    'Content-Length': contentLength,
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: formData
            })

        const accessToken = dataA.data['access_token'];

        const dataB = await
            axios({
                url: `https://api.linkedin.com/v1/people/~:(id)?format=json`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

        const { id } = dataB.data;

        const token = jwt.sign({ id, token: accessToken }, secret.jwtSecret, {
            expiresIn: 7200  //expires in 12 hours
        })

        res.status(200).send({ token });
    } catch (err) {
        res.status(401).send({ error: 'Failed LinkedIn Verification' })
    }
})


router.get('/linkedinData', async (req, res) => {
    try {
        const relic = req.headers['x-access-token'];
        if (relic === 'null' || R.isNil(t)) {
            throw 'missing a token'
        }
        jwt.verify(relic, secret.jwtSecret, async (err, decoded) => {
            const { id, token } = decoded;

            const data = await
                axios({
                    url: `https://api.linkedin.com/v1/people/id=${id}:(first-name,last-name)?format=json`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                res.status(200).send({ data: data.data })
        })
    } catch (err) {
        res.status(401).send({ error: 'Failed LinkedIn Verification' })
    }
})


module.exports = router;
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())

//Token variables
const expiresIn = '15s'
let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    //Has Token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        //Token no longer valid
        if (err) return res.sendStatus(403)

        const accessToken = generateAccessToken({ email: user.email })
        res.json({ accessToken: accessToken })
    })
})

app.post('/login', (req, res) => {
    // Authenticate User

    const email = req.body.email
    const user = {email: email}

    //Create JWT
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})

})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

//Helpers
function generateAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn })
}

app.listen(4000)
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
}


function setAccessTokenCookie(res, accessToken) {
    res.cookie('access_token', accessToken, { httpOnly: true });
  }
  

  function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
  }
  
  function setRefreshTokenCookie(res, refreshToken) {
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
  }
  

  module.exports ={
    generateAccessToken, 
    setAccessTokenCookie,
    generateRefreshToken,
    setRefreshTokenCookie
  }
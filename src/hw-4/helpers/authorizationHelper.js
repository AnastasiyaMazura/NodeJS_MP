import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, '34scrtstrng12', (err) => {
      if (err) {
        res.status(403).send({ success: false, message: 'Failed to authenticate token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ success: false, message: 'No token provided' });
  }
};
import auth from 'basic-auth';

const basicAuthMiddleware = (req, res, next) => {
  const user = auth(req);
  const validUser = process.env.API_USER;
  const validPass = process.env.API_PASS;

  if (!user || user.name !== validUser || user.pass !== validPass) {
    res.set('WWW-Authenticate', 'Basic realm="Access to orders API"');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

export default basicAuthMiddleware;
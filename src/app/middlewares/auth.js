import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddleware(req, res, next) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ error: 'Token not provided!' });
	}

	const token = authToken.split(' ').at(1);

	try {
		jwt.verify(token, authConfig.secret, (err, decode) => {
			if (err) {
				throw new Error(err);
			}

			req.userId = decode.id;
			req.userName = decode.name;
		});
	} catch (err) {
		return res.status(401).json({ error: 'Token invalid!' });
	}
	return next();
}

export default authMiddleware;

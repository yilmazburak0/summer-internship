import jwt from 'jsonwebtoken';
import errors from 'enums/errors';
import ErrorResponse from 'helpers/errorResponse';
import { getDatabaseConnection } from './databaseAdapter';
const {UserSchema} = require('models/User');

const db = getDatabaseConnection("MASTER")
const userModel = db.model('user', UserSchema);
// Protect routes
export const protect = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.split(' ')[1];
  }
  // Make sure token exists
  if (!token) throw new ErrorResponse(errors.TOKEN_NOT_VALID);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sessionUser = await userModel.findById(decoded.id).lean()
    if (sessionUser.status !== 'active') {
      throw new ErrorResponse(errors.USER_NOT_ACTIVE);
    }
    req.user = sessionUser
    req.dbName = sessionUser?.dbName
    next();
  } catch (err) {
    throw new ErrorResponse(errors.TOKEN_NOT_VALID);
  }
};

// TODO: Burayı inceleyelim METİN
export const apiProtect = async (req, res, next) => {
  const { authorization } = req.headers;

  let apiKey;
  let secretKey;

  if (authorization && authorization.startsWith('Basic ')) {
    const authBase64 = authorization.split(' ')[1];
    const auth = Buffer.from(authBase64, 'base64');
    const text = auth.toString('ascii');

    apiKey = text.split(':')[0];
    secretKey = text.split(':')[1];
  }

  // Make sure token exists
  if (!apiKey || !secretKey) {
    throw new ErrorResponse(errors.UN_AUTHORIZED, 'ApiKey or secretKey not exist');
  }

  try {
    // Check for user
    let user = await User.findOne({ email: apiKey }).select('+password');

    if (!user) {
      throw new ErrorResponse(errors.WRONG_PASSWORD);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(secretKey);

    if (!isMatch) {
      throw new ErrorResponse(errors.WRONG_PASSWORD);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};

// Grant access to specific roles
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
    next();
  };
};

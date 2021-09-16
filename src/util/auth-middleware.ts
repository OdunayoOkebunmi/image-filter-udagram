import { Request, Response } from 'express';
import env from './env';
import { User } from '../controllers/v0/users/models/User';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';

export async function generatePassword (plainTextPassword: string): Promise<string> {
  const round = Number(env.salt_rounds);
  const salt_rounds = await bcrypt.genSalt(round);
  const hash = await bcrypt.hash(plainTextPassword, salt_rounds);
  return hash;
}

export async function comparePasswords (plainTextPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash);
}

export function generateJWT (user: User): string {
  return jwt.sign(user.toJSON(), env.jwt_secret)
}

export function requireAuth (req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization headers.' });
  }


  const token_bearer = req.headers.authorization.split(' ');
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = token_bearer[1];

  return jwt.verify(token, env.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
  });
}
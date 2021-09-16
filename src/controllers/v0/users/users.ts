
import * as EmailValidator from 'email-validator';
import { Request, Response } from 'express';
import { User } from '../users/models/User';
import { generatePassword, comparePasswords, generateJWT } from '../../../util/auth-middleware'

export const createUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
      return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    // find the user
    const user = await User.findByPk(email);
    // check that user doesnt exists
    if (user) {
      return res.status(422).send({ auth: false, message: 'User may already exist' });
    }
    const password_hash = await generatePassword(plainTextPassword);

    const newUser = await new User({
      email: email,
      password_hash: password_hash,
    });

    let savedUser;
    savedUser = await newUser.save();

    // Generate JWT
    const jwt = generateJWT(savedUser);

    res.status(201).send({ token: jwt, user: savedUser.short() });
  } catch (error) {
    throw error;
  }
};
export const signin = async (req: Request, res: Response) => {
  try {

    const email = req.body.email;
    const password = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!password) {
      return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const user = await User.findByPk(email);
    // check that user exists
    if (!user) {
      return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.password_hash)

    if (!authValid) {
      return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // Generate JWT
    const jwt = generateJWT(user);

    res.status(200).send({ auth: true, token: jwt, user: user.short() });
  } catch (error) {
    throw error;
  }
};
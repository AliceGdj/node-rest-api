import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.sendStatus(400); // bad request
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        // .select('+authentication.salt + authentication.password')
        // important to add this line otherwise we can not access authentication.salt and authentication.password later

        if (!user) {
            return res.sendStatus(400); // bad request
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403); // unauthorized 
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie('SESSION-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400); // bad request
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400); // bad request
        }
       
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400); // bad request
        }
        const salt = random();
        const user = await createUser({
            email, 
            username, 
            authentication: {
                salt, 
                password: authentication(salt, password),
            }
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400); // bad request
    }
}

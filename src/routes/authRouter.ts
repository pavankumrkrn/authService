import { Router, Request, Response } from "express";
import { authenticateUser } from "../auth/authenticateUser";
import UserModel from "../models/user";
import { User } from "../interfaces/interface";
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');

export const router = Router();

router.use(cookieParser());

router.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}))

router.post("/login", async (req: Request, res: Response) => {

    const { username, password} = req.body;

    console.log(username, password);

    const user = await UserModel.findOne({ email : username }) as unknown as User;

    if (!user) {
        res.status(400).json({ status : "failed", message: 'Invalid username/email or password' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    console.log(isMatch)

    if(!isMatch) {
        res.status(400).json({ status : "failed", message: 'Invalid username/email or password' });
    }

    const token = jwt.sign({id : user._id}, 'pavan123', {
        expiresIn : '1d'
    })

    res.cookie('token', token, {
        httpOnly : true,
        secure: false,
    })

    res.cookie('userId', user._id, {
        httpOnly : true,
        secure: false,
    })

    res.status(200).json({ status : "ok" });

})

router.get("/check", async (req: Request, res: Response) => {

    console.log("Hi in auth", req.cookies.token)
  
    const token = req.cookies.token;

    if (!token) {
        res.sendStatus(403);
    }

    jwt.verify(token, 'pavan123', (err: any) => {
        console.log(err)
        if (err) {
            return res.sendStatus(403);
        }
        res.status(200).send({
            status: "ok"
        })
    });

})

router.post("/signup", async (req: Request, res: Response) => {

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        username, email, password : hashedPassword
    })

    try {
        await newUser.save();
         
        res.status(201).json({
            status : "ok"
        })
        
    } catch (error: any) {
        if(error?.code === 11000) {
            res.status(400).json({ status: "failed", message: 'Email already exists' });
            return;
        }
        res.status(500).json({ status: "failed", message: 'Error signing up user', error: error?.message });
    }
})

router.post("/logout", async (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false
    });

    res.clearCookie('userId', {
        httpOnly: true,
        secure: false,
    });
    res.status(200).json({ status : "ok" });
})

router.post("/authenticate", authenticateUser)
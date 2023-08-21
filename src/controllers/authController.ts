import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {User} from "../entity/User.js";
import {AppDataSource} from "../data-source.js";
import {generateToken} from "../services/authService.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {name, email, phone, gender, home_planet, spacepass_no, dob, password} = req.body;

    if (!name || !email || !phone || !gender || !home_planet || !spacepass_no || !dob || !password) {
      return res.status(400).json({error: "All fields are required"});
    }
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser: User = new User(email, password_hash, name, phone, gender, home_planet, spacepass_no, dob);

    const savedUser: User = await AppDataSource.getRepository(User).save(newUser);

    // const uid = savedPassenger.uid;
    // const newUser = new User(uid, email, password_hash);
    // const savedUser = await AppDataSource.getRepository(User).save(newUser);
    // const tokenData = { id: uid, email: email }
    // const token = await generateToken(tokenData, "mal123", '1h')

    if (savedUser) {
      const responseData = {
        uid: savedUser.uid,
        message: "User created successfully"
      }
      res.status(201).json(responseData);
    }

  } catch (error) {
    res.status(500).json({error: "An error occurred while creating a passenger"});
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // get user from repository
    const {email, password} = req.body;
    const user = await userRepository.findOne({where: {email: email}});

    // check if user exists
    if (!user) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    const tokenData = {id: user.uid, email: user.email}
    const token = await generateToken(tokenData, process.env.JWT_SECRET || "secret", '1h')

    const responseData = {
      loggedIn: true,
      email: user.email,
      bearerToken: token,
    }
    res.status(200).json(responseData);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred while logging in"});
  }
};


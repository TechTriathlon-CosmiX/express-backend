import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Passenger } from "../entity/Passenger.js";
import { User } from "../entity/User.js";
// import {genarateToken} from "../services/passengerServices.js"
// const PassengerServices = require("../services/passengerServices.js")
import { generateToken,checkPassword } from "../services/passengerServices.js"; // Adjust path accordingly

import bcrypt from 'bcrypt';




export const registerPassenger = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const passengerRepository = AppDataSource.getRepository(Passenger);
    const { name, email, phone, gender, home_planet, home_country, spacepass_no, dob, password } = req.body;

    if (!name || !email || !phone || !gender || !home_planet || !home_country || !spacepass_no || !dob || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const firstUser = await userRepository.findOneBy({ email: email });
    if (firstUser) {
        return res.status(404).json({ error: "user already exist" });
      }

    const newPassenger = new Passenger(name, phone, gender, home_planet, home_country, spacepass_no, dob);
    const savedPassenger = await passengerRepository.save(newPassenger);

    const uid = savedPassenger.user_id;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const newUser = new User(uid, email, password_hash);
    const savedUser = await userRepository.save(newUser);
    const tokenData = { id: uid, email: email }
    const token = await generateToken(tokenData, "mal123", '1h')


    res.status(200).json({ status: true, token: savedUser });

  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a passenger" });
  }
};


export const loginPassenger = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // const passengerRepository = AppDataSource.getRepository(Passenger);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }


    const firstUser = await userRepository.findOneBy({ email: email });
    if (!firstUser) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    const pwHash=firstUser.password_hash;
    
    // const res= await checkPassword(pwHash, password);
    const isMatch = await bcrypt.compare(password,pwHash);

    if(!isMatch){
    return res.status(404).json({ error: "Incorrect credentials" });
    }

    const tokenData = { id: firstUser.uid, email: email }
    const token = await generateToken(tokenData, "mal123", '1h')


    return res.status(200).json({ status: true, token: token });

    // res.status(201).json(savedPassenger);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a passenger" });
  }
};

// Delete a passenger by ID
export const deletePassenger = async (req: Request, res: Response) => {
  try {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const { user_id } = req.params;

    const userIdAsNumber = Number(user_id);

    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const passenger = await passengerRepository.findOne({ where: { user_id: userIdAsNumber } });

    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    await passengerRepository.remove(passenger);

    res.json({ message: "Passenger deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the passenger" });
  }
};

// Update a passenger by ID
export const updatePassenger = async (req: Request, res: Response) => {
  try {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const { user_id } = req.params;
    const { name, phone, gender, home_planet, home_country, spacepass_no, dob } = req.body;

    const userIdAsNumber = Number(user_id);

    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const passenger = await passengerRepository.findOne({ where: { user_id: userIdAsNumber } });

    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    passenger.name = name;
    passenger.phone = phone;
    passenger.gender = gender;
    passenger.home_planet = home_planet;
    passenger.home_country = home_country;
    passenger.spacepass_no = spacepass_no;
    passenger.dob = dob;

    const updatedPassenger = await passengerRepository.save(passenger);

    res.json(updatedPassenger);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the passenger" });
  }
};

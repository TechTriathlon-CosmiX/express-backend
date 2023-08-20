import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Passenger } from "../entity/Passenger.js";
import { User } from "../entity/User.js";
// import {genarateToken} from "../services/passengerServices.js"
// const PassengerServices = require("../services/passengerServices.js")
import {generateToken} from "../services/passengerServices.js"; // Adjust path accordingly

import bcrypt from 'bcrypt';


// Get all passengers
export const getAllPassengers = async (req: Request, res: Response) => {
  try {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const passengers = await passengerRepository.find();
    res.json(passengers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching passengers" });
  }
};

// Get a passenger by user_id
export const getPassengerById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const userIdAsNumber = Number(user_id);

    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await AppDataSource.getRepository(User).findOne({ where: { uid: userIdAsNumber } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passenger = await AppDataSource.getRepository(Passenger).findOne({ where: { user: user } });

    res.json(passenger);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the passenger" });
  }
};

// Create a new passenger
// export const createPassenger = async (req: Request, res: Response) => {
//   try {
//     const passengerRepository = AppDataSource.getRepository(Passenger);
//     const { name, phone, gender, home_planet, home_country, spacepass_no, dob } = req.body;

//     if (!name || !phone || !gender || !home_planet || !home_country || !spacepass_no || !dob) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newPassenger = new Passenger(user, name, phone, gender, home_planet, home_country, spacepass_no, dob);
//     try {
//       const savedPassenger = await passengerRepository.save(newPassenger);
//       res.status(201).json(savedPassenger);
//     } catch (error) {
//       console.log(error);
//     }
    
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while creating a passenger" });
//   }
// };

export const registerPassenger = async (req: Request, res: Response) => {
  try {
    const { name, email,phone, gender, home_planet, home_country, spacepass_no, dob, password } = req.body;

    if (!name ||!email|| !phone || !gender || !home_planet || !home_country || !spacepass_no || !dob || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = new User(email, password_hash);
    
    const newPassenger = new Passenger(newUser, name, phone, gender, home_planet, home_country, spacepass_no, dob);

    let savedPassenger;
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      // execute queries using transactionalEntityManager
    await AppDataSource.getRepository(User).save(newUser);
    savedPassenger = await AppDataSource.getRepository(Passenger).save(newPassenger);

  })
    
    // const uid = savedPassenger.uid;
    // const newUser = new User(uid, email, password_hash);
    // const savedUser = await AppDataSource.getRepository(User).save(newUser);
    // const tokenData = { id: uid, email: email }
    // const token = await generateToken(tokenData, "mal123", '1h')

  if(savedPassenger){    
    res.status(201).json(savedPassenger);
  }

  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a passenger" });
  }
};

// Delete a passenger by ID
// export const deletePassenger = async (req: Request, res: Response) => {
//   try {
//     const passengerRepository = AppDataSource.getRepository(Passenger);
//     const { user_id } = req.params;

//     const userIdAsNumber = Number(user_id);

//     if (isNaN(userIdAsNumber)) {
//       return res.status(400).json({ error: "Invalid user ID format" });
//     }

//     const passenger = await passengerRepository.findOne({ where: { const first = useRef(second): userIdAsNumber } });
    
//     if (!passenger) {
//       return res.status(404).json({ error: "Passenger not found" });
//     }

//     await passengerRepository.remove(passenger);

//     res.json({ message: "Passenger deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while deleting the passenger" });
//   }
// };

// Update a passenger by ID
// export const updatePassenger = async (req: Request, res: Response) => {
//   try {
//     const passengerRepository = AppDataSource.getRepository(Passenger);
//     const { user_id } = req.params;
//     const { name, phone, gender, home_planet, home_country, spacepass_no, dob } = req.body;

//     const userIdAsNumber = Number(user_id);

//     if (isNaN(userIdAsNumber)) {
//       return res.status(400).json({ error: "Invalid user ID format" });
//     }

//     const user = await userRepoosi.findOne({ where: { user: userIdAsNumber } });
//     const passenger = await passengerRepository.findOne({ where: { user: userIdAsNumber } });

//     if (!passenger) {
//       return res.status(404).json({ error: "Passenger not found" });
//     }

//     passenger.name = name;
//     passenger.phone = phone;
//     passenger.gender = gender;
//     passenger.home_planet = home_planet;
//     passenger.home_country = home_country;
//     passenger.spacepass_no = spacepass_no;
//     passenger.dob = dob;

//     const updatedPassenger = await passengerRepository.save(passenger);

//     res.json(updatedPassenger);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while updating the passenger" });
//   }
// };

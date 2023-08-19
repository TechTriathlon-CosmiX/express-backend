import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Passenger } from "../entity/Passenger.js";

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

// Create a new passenger
export const createPassenger = async (req: Request, res: Response) => {
  try {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const { name, phone, gender, home_planet, home_country, spacepass_no, dob } = req.body;

    if (!name || !phone || !gender || !home_planet || !home_country || !spacepass_no || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPassenger = new Passenger(name, phone, gender, home_planet, home_country, spacepass_no, dob);
    const savedPassenger = await passengerRepository.save(newPassenger);
    res.status(201).json(savedPassenger);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a passenger" });
  }
};


// Delete a passenger by ID
export const deletePassenger = async (req: Request, res: Response) => {
  try {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const { id } = req.params;

    const passenger = await passengerRepository.findOne({
      where: { user_id: id }, 
    });
    
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
    const { id } = req.params;
    const { name, phone, gender, home_planet, home_country, spacepass_no, dob } = req.body;

    const passenger = await passengerRepository.findOne(id);

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

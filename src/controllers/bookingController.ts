import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Passenger } from "../entity/Passenger.js";
import { Booking } from "../entity/Booking.js";
import { User } from "../entity/User.js";

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {

    const { user_id } = req.params;
    const {
      placed_time,
      adult_count,
      child_count,
      additional_remarks,
      additional_luggage_capacity,
      additional_luggage_charge,
      net_value
    } = req.body;

    const userIdAsNumber = Number(user_id);

    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    
    const user = await AppDataSource.getRepository(User).findOne({ where: { uid: userIdAsNumber } });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const passenger = await AppDataSource.getRepository(Passenger).findOne({ where: { user: user } });

    if (passenger) {
      const newBooking = new Booking(placed_time, adult_count, child_count, additional_remarks, additional_luggage_capacity, additional_luggage_charge, net_value, passenger);

      const savedBooking = await AppDataSource.getRepository(Booking).save(newBooking);

      res.status(201).json(savedBooking);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a booking" });
  }
};


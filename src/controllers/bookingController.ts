import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Passenger } from "../entity/Passenger.js";
import { Booking } from "../entity/Booking.js";

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const passengerRepository = AppDataSource.getRepository(Passenger);

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

    const passenger = await passengerRepository.findOne({ where: { user_id: userIdAsNumber } });

    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    const newBooking = new Booking(
      placed_time,
      adult_count,
      child_count,
      additional_remarks,
      additional_luggage_capacity,
      additional_luggage_charge,
      net_value,
      passenger
    );

    const savedBooking = await bookingRepository.save(newBooking);

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a booking" });
  }
};


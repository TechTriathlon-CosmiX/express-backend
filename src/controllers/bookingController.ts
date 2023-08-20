import {Request, Response} from "express";
import {AppDataSource} from "../data-source.js";
import {Booking} from "../entity/Booking.js";
import {User} from "../entity/User.js";
import {Payment} from "../entity/Payment";
import {Flight} from "../entity/Flight";
import {Cabin} from "../entity/Cabin";

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {

    const userId = req.body.user.id;
    const {
      placedTime,
      adultCount,
      childCount,
      additionalRemarks,
      additionalLuggageCapacity,
      additionalLuggageCharge,
      netValue,
      flightId,
      cabinIds,
      paymentAmount,
    } = req.body;

    const user = await AppDataSource.getRepository(User).findOne({where: {uid: userId}});
    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    const flight = await AppDataSource.getRepository(Flight).findOne({where: {id: flightId}});
    if (!flight) {
      return res.status(404).json({error: "Flight not found"});
    }

    const cabins = await AppDataSource.getRepository(Cabin).findBy({cabinNo: cabinIds});
    const newPayment = new Payment(paymentAmount, "PENDING");

    const newBooking = new Booking(placedTime, adultCount, childCount, additionalRemarks, additionalLuggageCapacity, additionalLuggageCharge, netValue, flight, user, cabins, newPayment);

    const savedBooking = await AppDataSource.getRepository(Booking).save(newBooking);

    res.status(201).json(savedBooking);

  } catch (error) {
    res.status(500).json({error: "An error occurred while creating a booking"});
  }
};

// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await AppDataSource.getRepository(Booking).find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({error: "An error occurred while retrieving bookings"});
  }
}

// Get a booking by id
export const getBookingById = async (req: Request, res: Response) => {

  const booking_id = req.params.id;
  try {
    const booking = await AppDataSource.getRepository(Booking).findOne({where: {bookingId: Number(booking_id)}});
    if (!booking) {
      return res.status(404).json({error: "Booking not found"});
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({error: "An error occurred while retrieving booking"});
  }
}

// Get bookings by user
export const getBookingsByUser = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  const user = await AppDataSource.getRepository(User).findOne({where: {uid: userId}});

  if (!user) {
    return res.status(404).json({error: "User not found"});
  }
  try {
    const bookings = await AppDataSource.getRepository(Booking).find({where: {user: user}});
    if (!bookings) {
      return res.status(404).json({error: "No bookings found"});
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({error: "An error occurred while retrieving bookings"});
  }
}




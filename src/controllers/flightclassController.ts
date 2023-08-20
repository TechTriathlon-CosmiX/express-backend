import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { FlightClass } from "../entity/FlightClass.js";

// Get all planets
export const getAllFlightClasses = async (req: Request, res: Response) => {
  try {
    const flightclassRepository = AppDataSource.getRepository(FlightClass);
    const FlightClasss = await flightclassRepository.find();
    res.json(FlightClasss);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching FlightClasss" });
  }
};


// Get a planet by id
export const getFlightClassById = async (req: Request, res: Response) => {
  try {
    const flightclassRepository = AppDataSource.getRepository(FlightClass);
    const { classId } = req.params;

    const flightclassIdAsNumber = Number(classId);

    if (isNaN(flightclassIdAsNumber)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const flightclass = await flightclassRepository.findOne({ where: { classId: flightclassIdAsNumber } });

    if (!flightclass) {
      return res.status(404).json({ error: "flightclass not found" });
    }

    res.json(flightclass);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the FlightClass" });
  }
};

// Update a planet by ID
export const updateFlightClass = async (req: Request, res: Response) => {
  try {
    const flightclassRepository = AppDataSource.getRepository(FlightClass);

    const { classId } = req.params;
    const { className,basefare } = req.body;


    const flightclassIdAsNumber = Number(classId);

    if (isNaN(flightclassIdAsNumber)) {
      return res.status(400).json({ error: "Invalid flightclass ID format" });
    }

    const flightclass = await flightclassRepository.findOne({ where: { classId: flightclassIdAsNumber } });

    if (!flightclass) {
      return res.status(404).json({ error: "flightclass not found to be updated" });
    }

    flightclass.className = className;
    flightclass.basefare = basefare;

    const updatedFlightClass = await flightclassRepository.save(flightclass);

    res.json(updatedFlightClass);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the flightclass" });
  }
};

// Create a new planet
export const createFlightClass = async (req: Request, res: Response) => {
    try {
      const flightclassRepository = AppDataSource.getRepository(FlightClass);

      const { className,basefare} = req.body;
  
      if (!className || !basefare) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newFlightClass = new FlightClass(className,basefare);
      const savedFlightClass = await flightclassRepository.save(newFlightClass);
      res.status(201).json(savedFlightClass);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating a flightclassRepository" });
    }
  };
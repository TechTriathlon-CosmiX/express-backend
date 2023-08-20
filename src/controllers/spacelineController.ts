import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Passenger } from "../entity/Passenger.js";
import { Spaceline } from "../entity/Spaceline.js";




// Get all spacelines
export const getAllSpacelines = async (req: Request, res: Response) => {
  try {
    const spacelineRepository = AppDataSource.getRepository(Spaceline);
    const spacelines = await spacelineRepository.find();
    res.json(spacelines);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching spacelines" });
  }
};

// Get a passenger by user_id
export const getSpacelineById = async (req: Request, res: Response) => {
  try {
    const spacelineRepository = AppDataSource.getRepository(Spaceline);

    const { spaceline_id } = req.params;

    const spacelineId = Number(spaceline_id);

    if (isNaN(spacelineId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const spaceline = await spacelineRepository.findOne({ where: { spaceline_id: spacelineId } });

    if (!spaceline) {
      return res.status(404).json({ error: "spaceline not found" });
    }

    res.json(spaceline);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the spaceline" });
  }
};

// Create a new spaceline
export const createSpaceline = async (req: Request, res: Response) => {
  try {
    const spacelineRepository = AppDataSource.getRepository(Spaceline);
    const { name, logo } = req.body;

    if (!name || !logo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSpaceline = new Spaceline(name,logo);
    try {
      const savedSpaceline = await spacelineRepository.save(newSpaceline);
      res.status(201).json(savedSpaceline);
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a Spaceline" });
  }
};


// Delete a spaceline by ID
export const deleteSpaceline = async (req: Request, res: Response) => {
  try {
    const spacelineRepository = AppDataSource.getRepository(Spaceline);
    const { spaceline_id } = req.params;

    const userIdAsNumber = Number(spaceline_id);

    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({ error: "Invalid spaceline_id ID format" });
    }

    const spaceline = await spacelineRepository.findOne({ where: { spaceline_id: userIdAsNumber } });

    if (!spaceline) {
      return res.status(404).json({ error: "spaceline not found" });
    }

    await spacelineRepository.remove(spaceline);

    res.json({ message: "Passenger deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the spaceline" });
  }
};



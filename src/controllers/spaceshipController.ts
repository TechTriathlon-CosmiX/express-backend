import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Spaceship } from "../entity/Spaceship.js";




// Get all spaceship
export const getallspaceships = async (req: Request, res: Response) => {
  try {
    const SpaceshipRepository = AppDataSource.getRepository(Spaceship);
    const spaceship = await SpaceshipRepository.find();
    res.json(spaceship);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching spaceship" });
  }
};

// Get a passenger by user_id
export const getspaceshipbyId = async (req: Request, res: Response) => {
  try {
    const SpaceshipRepository = AppDataSource.getRepository(Spaceship);

    const { spaceship_id } = req.params;

    const spaceshipID = Number(spaceship_id);

    if (isNaN(spaceshipID)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const spaceship = await SpaceshipRepository.findOne({ where: { spaceship_id: spaceshipID } });

    if (!spaceship) {
      return res.status(404).json({ error: "spaceship not found" });
    }

    res.json(spaceship);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the spaceship" });
  }
};

// Create a new spaceline
export const createSpaceship = async (req: Request, res: Response) => {
  try {
    const SpaceshipRepository = AppDataSource.getRepository(Spaceship);
    const { name,passenger_count,cabin_count, image,facilities } = req.body;

    if (!name || !passenger_count||!cabin_count||!image||!facilities) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSpaceship = new Spaceship(name,passenger_count,cabin_count,image,facilities);
    try {
      const savedspaceship = await SpaceshipRepository.save(newSpaceship);
      res.status(201).json(savedspaceship);
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a spaceship" });
  }
};


// Delete a spaceline by ID
export const deletespaceship = async (req: Request, res: Response) => {
  try {
    const SpaceshipRepository = AppDataSource.getRepository(Spaceship);
    const { spaceline_id } = req.params;

    const spacelineId = Number(spaceline_id);

    if (isNaN(spacelineId)) {
      return res.status(400).json({ error: "Invalid spaceline_id ID format" });
    }

    const spaceship = await SpaceshipRepository.findOne({ where: { spaceship_id: spacelineId } });

    if (!spaceship) {
      return res.status(404).json({ error: "spaceship not found" });
    }

    await SpaceshipRepository.remove(spaceship);

    res.json({ message: "spaceship deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the spaceship" });
  }
};

export const updateCabincount = async (req: Request, res: Response) => {
    try {
      const SpaceshipRepository = AppDataSource.getRepository(Spaceship);
      const { spaceline_id,cabin_count } = req.params;
  
      const spacelineId = Number(spaceline_id);
      const cabincnt=Number(cabin_count);
  
      if (isNaN(spacelineId)) {
        return res.status(400).json({ error: "Invalid spaceline_id ID format" });
      }
  
      const spaceship = await SpaceshipRepository.findOne({ where: { spaceship_id: spacelineId } });
  
      if (!spaceship) {
        return res.status(404).json({ error: "spaceship not found" });
      }
      spaceship.cabin_count = cabincnt;
      const updatedSpaceship = await SpaceshipRepository.save(spaceship);
      res.json(updatedSpaceship);

  
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the spaceship" });
    }
  };


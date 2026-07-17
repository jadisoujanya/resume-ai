import { Request, Response } from "express";
import { getDashboardData } from "../services/dashboard.service";

export const getCandidateDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const dashboard = await getDashboardData();

    res.status(200).json(dashboard);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
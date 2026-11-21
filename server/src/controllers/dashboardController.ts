import type { Request, Response } from "express";
import type { Overview } from "../types/overview";
import { pool } from "../database/pool";

export async function getOverviewList(_req: Request, res: Response) {
  try {
    const { rows } = await pool.query<Overview[]>(
      "SELECT * FROM dashboard_overview ORDER BY created_at DESC",
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Get dasboard overviews:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

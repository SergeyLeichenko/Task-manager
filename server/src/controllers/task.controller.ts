import type { Request, Response, NextFunction } from "express";
import * as service from "../services/task.service";

const wrap =
  (fn: (req: Request, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };

function id(req: Request) {
  const n = Number(req.params.id);
  if (!Number.isSafeInteger(n) || n < 1)
    throw Object.assign(new Error("Invalid task id"), { statusCode: 400 });
  return n;
}

export const list = wrap(async (_q, res) => {
  res.json(await service.getTasks());
});

export const get = wrap(async (req, res) => {
  res.json(await service.getTask(id(req)));
});

export const create = wrap(async (req, res) => {
  res.status(201).json(await service.createTask(req.body));
});

export const update = wrap(async (req, res) => {
  res.json(await service.updateTask(id(req), req.body));
});

export const remove = wrap(async (req, res) => {
  await service.deleteTask(id(req));
  res.status(204).send();
});

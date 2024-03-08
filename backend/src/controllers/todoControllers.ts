import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ITodo, Todo, TodoDoc } from "../../src/models/todo";

interface Id {
  id: ObjectId;
}

export const create = async (
  req: Request<{}, {}, ITodo>, // why we did this because we tell typescript what should be in our request body
  // we do not have params in our request body
  res: Response<TodoDoc>
) => {
  const { description, todoStatus } = req.body;
  const newTodo = Todo.build({ description, todoStatus });
  newTodo.save();
  return res.status(201).json(newTodo);
};

export const deleteTodo = async (req: Request<Id>, res: Response) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete({ _id: id }).catch((error) => {
    return res.status(400).json(error);
  });
  return res.status(200).json();
};

interface Error {
  error: string;
}

export const updateTodo = async (
  req: Request<Id, {}, ITodo>,
  res: Response<TodoDoc | Error>
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  const { description, todoStatus } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate<TodoDoc>(
      { _id: id },
      { description, todoStatus },
      { new: true } // this is for return updated todo newly updated todo
    );
    await updatedTodo.save();
    return res.status(200).json(updatedTodo);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Please provide a valid id" });
    }
  }
};

export const getAllTodos = async (
  req: Request<Id, {}, ITodo>,
  res: Response<TodoDoc[]>
) => {
  const todos = await Todo.find<TodoDoc>();
  return res.status(200).json(todos);
};

export const getTodo = async (req: Request<Id>, res: Response<TodoDoc>) => {
  const { id } = req.params;
  const todo = await Todo.findOne<TodoDoc>({ _id: id });
  return res.status(200).json(todo);
};

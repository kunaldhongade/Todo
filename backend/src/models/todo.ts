import mongoose from "mongoose";

export interface ITodo {
  description: string;
  todoStatus: boolean;
}

export interface TodoDoc extends mongoose.Document {
  description: string;
  todoStatus: boolean;
}

interface ITodoModel extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc; // this is for just header
  // this function is just function header arguments that satisfy iTodo interface that returns todoDoc with id for edit todo deleteTodo FetchTodo
}

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    todoStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr);
};

export const Todo = mongoose.model<TodoDoc, ITodoModel>("Todo", todoSchema);

const newTodo = new Todo();

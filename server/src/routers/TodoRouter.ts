import { authMiddleware } from "../middlewares/authMiddleware.js";
import Todo from "../models/TodoModel.js";
import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";

// Input validation schemas
const createTodoInput = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});

const updateTodoInput = z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});

const deleteTodoInput = z.object({
    id: z.string(),
});

export const TodoRouter = router({
    // Create a new todo
    createTodo: publicProcedure
        .use(authMiddleware)
        .input(createTodoInput)
        .mutation(async (opts) => {
            try {
                const { title, description } = opts.input;

                const todo = new Todo({
                    title: title.trim(),
                    description: description.trim(),
                    completed: false
                });

                await todo.save();

                return {
                    success: true,
                    message: "Todo created successfully",
                    todo: {
                        id: todo._id,
                        title: todo.title,
                        description: todo.description,
                    }
                };
            } catch (error) {
                throw new Error("Failed to create todo");
            }
        }),

    // Get all todos
    getAllTodos: publicProcedure
        .use(authMiddleware)
        .query(async () => {
            try {
                const todos = await Todo.find().sort({ createdAt: -1 });

                return {
                    success: true,
                    todos: todos.map(todo => ({
                        id: todo._id,
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                        createdAt: todo.createdAt,
                        updatedAt: todo.updatedAt
                    }))
                };
            } catch (error) {
                throw new Error("Failed to fetch todos");
            }
        }),

    // Get a single todo by ID
    getTodoById: publicProcedure
        .use(authMiddleware)
        .input(z.object({ id: z.string() }))
        .mutation(async (opts) => {
            try {
                const todo = await Todo.findById(opts.input.id);
                
                if (!todo) {
                    throw new Error("Todo not found");
                }

                return {
                    success: true,
                    todo: {
                        id: todo._id,
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                    }
                };
            } catch (error) {
                throw new Error("Failed to fetch todo");
            }
        }),

    // Update a todo
    updateTodo: publicProcedure
        .use(authMiddleware)
        .input(updateTodoInput)
        .mutation(async (opts) => {
            try {
                const { id, ...updateData } = opts.input;

                const todo = await Todo.findByIdAndUpdate(
                    id,
                    { ...updateData },
                    { new: true, runValidators: true }
                );

                if (!todo) {
                    throw new Error("Todo not found");
                }

                return {
                    success: true,
                    message: "Todo updated successfully",
                    todo: {
                        id: todo._id,
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                    }
                };
            } catch (error) {
                throw new Error("Failed to update todo");
            }
        }),

    // Delete a todo
    deleteTodo: publicProcedure
        .use(authMiddleware)
        .input(deleteTodoInput)
        .mutation(async (opts) => {
            try {
                const todo = await Todo.findByIdAndDelete(opts.input.id);
                if (!todo) {
                    throw new Error("Todo not found");
                }
                return {
                    success: true,
                    message: "Todo deleted successfully"
                };
            } catch (error) {
                throw new Error("Failed to delete todo");
            }
        }),

    // Toggle todo completion status
    toggleTodo: publicProcedure
        .use(authMiddleware)
        .input(z.object({ id: z.string() }))
        .mutation(async (opts) => {
            try {
                const todo = await Todo.findById(opts.input.id);
                if (!todo) {
                    throw new Error("Todo not found");
                }

                todo.completed = !todo.completed;
                await todo.save();

                return {
                    success: true,
                    message: `Todo ${todo.completed ? 'completed' : 'marked as incomplete'}`,
                    todo: {
                        id: todo._id,
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                    }
                };
            } catch (error) {
                throw new Error("Failed to toggle todo");
            }
        })
});
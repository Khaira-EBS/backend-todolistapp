const Todo = require('../models/todo');

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // tambah todo baru
    const newTodo = new Todo({ title, description });
    await newTodo.save();

    res.json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTodos = async (req, res) => {
  try {
    // lihat semua todo
    const todos = await Todo.find();
    
    res.json({ todos });
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;

    // cari todo berdasarkan id
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ todo });
  } catch (error) {
    console.error('Error getting todo by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;

    // update todo berdasarkan id
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title, description }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // hapus todo berdasarkan id
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    // hapus semua todo
    await Todo.deleteMany();

    res.json({ message: 'All todos deleted successfully' });
  } catch (error) {
    console.error('Error deleting all todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo, deleteAllTodos };

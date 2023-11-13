const express = require('express');
const router = express.Router();
const { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo, deleteAllTodos } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); //autentikasi

router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteAllTodos);

module.exports = router;
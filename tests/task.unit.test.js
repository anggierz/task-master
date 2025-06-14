const TaskController = require('../controllers/taskController');
const Task = require('../models/Task');
const taskSchema = require('../schemas/taskSchema');

jest.mock('../models/Task');
jest.mock('../schemas/taskSchema');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe('TaskController.createTask', () => {
  it('should return 400 if validation fails', async () => {
    taskSchema.validate.mockReturnValue({
      error: { details: [{ message: 'Title is required' }] },
    });

    const req = { body: {}, user: { id: 1 } };
    const res = mockRes();

    await TaskController.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: ['Title is required'],
    });
  });

  it('should create task and return 201', async () => {
    taskSchema.validate.mockReturnValue({ error: null });
    Task.create.mockResolvedValue({ id: 1, title: 'Test', UserId: 1 });

    const req = { body: { title: 'Test' }, user: { id: 1 } };
    const res = mockRes();

    await TaskController.createTask(req, res);

    expect(Task.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Test', UserId: 1 });
  });
});

describe('TaskController.getTasks', () => {
  it('should return tasks for user', async () => {
    Task.findAll.mockResolvedValue([{ id: 1, title: 'Task 1' }]);

    const req = { user: { id: 1 } };
    const res = mockRes();

    await TaskController.getTasks(req, res);

    expect(Task.findAll).toHaveBeenCalledWith({ where: { UserId: 1 } });
    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Task 1' }]);
  });
});

describe('TaskController.updateTask', () => {
  it('should return 404 if task not found', async () => {
    taskSchema.validate.mockReturnValue({ error: null });
    Task.findOne.mockResolvedValue(null);

    const req = { params: { id: 1 }, body: { title: 'New' }, user: { id: 1 } };
    const res = mockRes();

    await TaskController.updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });
});

describe('TaskController.deleteTask', () => {
  it('should return 404 if task not found', async () => {
    Task.findOne.mockResolvedValue(null);

    const req = { params: { id: 1 }, user: { id: 1 } };
    const res = mockRes();

    await TaskController.deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });

  it('should delete task and return message', async () => {
    const destroy = jest.fn();
    Task.findOne.mockResolvedValue({ destroy });

    const req = { params: { id: 1 }, user: { id: 1 } };
    const res = mockRes();

    await TaskController.deleteTask(req, res);

    expect(destroy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted successfully.' });
  });
});

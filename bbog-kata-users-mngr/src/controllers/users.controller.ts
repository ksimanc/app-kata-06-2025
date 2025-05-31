import { Request, Response, Router } from 'express';

// Dummy user data
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
  },
];

const UsersController = Router();

UsersController.get('/', (req: Request, res: Response) => {
  res.json(users);
});

export { UsersController };

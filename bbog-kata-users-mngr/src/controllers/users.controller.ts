import { Request, Response, Router } from 'express';
import { UsersService } from '../services/users.service';

const UsersController = Router();

UsersController.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    res.json({
      users: await UsersService.listUsers(page),
      total: await UsersService.countUsers(),
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

UsersController.post('/', async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const createdUser = await UsersService.registerUser(userData);

    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

export { UsersController };

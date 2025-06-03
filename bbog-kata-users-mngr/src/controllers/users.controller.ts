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

UsersController.get('/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    res.json({
      users: await UsersService.searchUser(query),
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

UsersController.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { status } = req.body;

    await UsersService.updateUserStatus(userId, status);

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

export { UsersController };

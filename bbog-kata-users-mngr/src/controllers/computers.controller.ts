import { Request, Response, Router } from 'express';
import { ComputersService } from '../services/computers.service';

const ComputersController = Router();

ComputersController.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    res.json({
      computers: await ComputersService.listComputers(page),
      total: await ComputersService.countComputers(),
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

ComputersController.get('/search-users', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    res.json({
      users: await ComputersService.searchUsersWithNoComputer(query),
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

ComputersController.post('/assign', async (req: Request, res: Response) => {
  try {
    await ComputersService.assignComputer(req.body.computerId, req.body.userId);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

ComputersController.get('/history', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    res.json({
      history: await ComputersService.getAssignmentHistory(page),
      total: await ComputersService.countAssignmentHistory(),
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

ComputersController.post('/', async (req: Request, res: Response) => {
  try {
    await ComputersService.registerComputer(req.body.model, req.body.serialNumber);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

export { ComputersController };

import { Router } from 'express';
import { AppsService } from '../services/apps.service';

const AppsController = Router();

AppsController.get('/', async (req, res) => {
  try {
    const userId = req.query.userId as any;

    res.json({
      apps: await AppsService.getAppsAvailableForUser(userId),
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

AppsController.get('/access-request', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    res.json({
      accessRequests: await AppsService.getAccessRequests(page),
      total: await AppsService.countAccessRequests(),
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

AppsController.post('/access-request', async (req, res) => {
  try {
    await AppsService.giveAccessToApps(req.body.userId, req.body.appIds);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.send(500).send(error + '');
  }
});

export { AppsController };

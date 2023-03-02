import { Router } from 'express';
import {
  getAllNotifications,
  createNotification,
  getNotificationsByUserId,
  setNotificationToViewed,
  deleteNotification,
} from '../controllers/notifications.js';
import {
  validateAuthentication,
  validateDeveloperRole,
} from '../middleware/auth.js';

const router = Router();

router.get('/', getAllNotifications);
router.get('/:userId', getNotificationsByUserId);
router.post('/create', createNotification);
router.put('/viewed/:notificationId', setNotificationToViewed);
router.delete('/delete/:notificationId', deleteNotification);

export default router;

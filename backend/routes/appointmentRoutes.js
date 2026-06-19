import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createAppointment).get(protect, admin, getAppointments);
router.route('/:id/status').put(protect, admin, updateAppointmentStatus);

export default router;

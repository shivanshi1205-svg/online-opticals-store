import Appointment from '../models/Appointment.js';

// @desc    Create an appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res, next) => {
  try {
    const { name, email, phone, date, preferredTime, notes } = req.body;

    const appointment = new Appointment({
      name,
      email,
      phone,
      date,
      preferredTime,
      notes,
      user: req.user ? req.user._id : null,
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({}).populate('user', 'id name');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private/Admin
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = status;
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404);
      throw new Error('Appointment not found');
    }
  } catch (error) {
    next(error);
  }
};

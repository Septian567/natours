const AppError = require('./appError');
const User = require('./../models/userModels');

const signupValidation = async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return next(
      new AppError(
        'Passwords do not match. Please re-enter your password.',
        400
      )
    );
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError('Email already exists!', 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Check if email format is valid
  if (!emailRegex.test(req.body.email)) {
    return next(
      new AppError('Invalid email format. Please enter a valid email address.'),
      400
    );
  }

  next(); // Lanjutkan ke middleware berikutnya jika semua validasi berhasil
};

module.exports = signupValidation;

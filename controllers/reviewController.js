const Review = require('./../models/reviewModels');
const Booking = require('./../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.restrictReviews = catchAsync(async (req, res, next) => {
  const { tour, user } = req.body;
  const booking = await Booking.find({ tour, user });

  if (booking.length === 0)
    return next(
      new AppError(
        'You do not have permission to write a review for this tour',
        403
      )
    );
  next();
});

exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

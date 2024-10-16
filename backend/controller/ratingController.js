import Rating from "../models/ratingModel.js";
import User from "../models/userModel.js";

// creating a new rating

const createRating = async (req, res) => {
  try {
      const { ratingValue, review, ratedEmployee } = req.body;
      const ratedBy = req.user._id;

      // Prevent rating yourself
      if (ratedBy.toString() === ratedEmployee) {
          return res.status(400).json({
              message: "You cannot rate yourself."
          });
      }

      // Check if the employee has already rated this employee
      const existingRating = await Rating.findOne({
          ratedBy: ratedBy,
          ratedEmployee: ratedEmployee
      });

      if (existingRating) {
          return res.status(400).json({
              message: "You have already rated this employee."
          });
      }

      // Create a new rating if no existing rating is found
      const newRating = new Rating({
          ratingValue,
          review,
          ratedBy,
          ratedEmployee
      });
      await newRating.save();

      return res.status(201).json({
          message: "Rating submitted successfully"
      });
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}


// get all ratings for a specific employee (for employee view)

const getMyRatings = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const ratings = await Rating.find({ ratedEmployee: userId }).select('ratingValue');
  
      const totalRatings = ratings.length;
      const sumRatings = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
  
      res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  


  
// get all ratings for a specific employee (for manager view)


const getAllRatings = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Fetch employees under this manager and include the image field
    const employeesUnderThisManager = await User.find({ managed_by: currentUserId })
      .select('_id firstname lastname image') // Include image in the selection
      .lean();

    // Fetch all ratings and populate ratedBy and ratedEmployee
    const ratings = await Rating.find()
      .populate('ratedBy', '_id firstname lastname')
      .populate('ratedEmployee', '_id firstname lastname managed_by image') // Populate image for ratedEmployee
      .lean();

    // Create a map to store ratings by employee ID
    const employeeRatingsMap = {};

    // Group ratings by employee
    ratings.forEach(rating => {
      const employeeId = rating.ratedEmployee._id.toString();
      if (!employeeRatingsMap[employeeId]) {
        employeeRatingsMap[employeeId] = {
          ratings: [],
          totalRating: 0,
          ratingCount: 0,
        };
      }

      employeeRatingsMap[employeeId].ratings.push({
        ratedBy: rating.ratedBy,
        ratingValue: rating.ratingValue,
        review: rating.review,
      });

      // Accumulating total rating for average calculation
      employeeRatingsMap[employeeId].totalRating += rating.ratingValue;
      employeeRatingsMap[employeeId].ratingCount += 1;
    });

    // Ensure all employees under this manager are included in the response
    const employeeRatings = employeesUnderThisManager.map(employee => {
      const employeeId = employee._id.toString();
      const ratingsData = employeeRatingsMap[employeeId] || {
        ratings: [],
        totalRating: 0,
        ratingCount: 0,
      };

      return {
        employee: {
          _id: employee._id,
          firstname: employee.firstname,
          lastname: employee.lastname,
          image: employee.image, 
        },
        averageRating: (ratingsData.ratingCount > 0 ? (ratingsData.totalRating / ratingsData.ratingCount).toFixed(2) : '0.00'),
        ratings: ratingsData.ratings,
        message: ratingsData.ratings.length === 0 ? 'No ratings found' : '',
      };
    });

    // Send the response
    res.status(200).json(employeeRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export {
    createRating,
    getMyRatings,
    getAllRatings
}
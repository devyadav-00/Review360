import Rating from "../models/ratingModel.js";
import User from "../models/userModel.js";

// creating a new rating

const createRating = async (req, res) => {
    try{
        const { ratingValue, review, ratedEmployee } = req.body;
        const ratedBy = req.user._id;
        // console.log("req.user: ", req.user);

        if (ratedBy.toString() === ratedEmployee)
        {
            return res.status(400).json({
                message: "You cannot rate yourSelf."
            });
        }
        const newRating = new Rating({
            ratingValue,
            review,
            ratedBy,
            ratedEmployee
        });
        await newRating.save();
        return res.status(201).json({
            message:"Rating submitted succesfully"
        });
    }
    catch (error)
    {
        res.status(500).json({
            message:error.message
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
  

// get average ratings and data of the employee who rated and how much rating he/she given 
// for each employee(for employer view)
  

const getAllRatings = async (req, res) => {
  try {

    // Fetching all ratings
    const ratings = await Rating.find()
      .populate('ratedBy', '_id firstname lastname')
      .populate('ratedEmployee', '_id firstname lastname');

    // Grouping ratings by employee
    const employeeRatingsMap = {};

    ratings.forEach(rating => {
      const employeeId = rating.ratedEmployee._id.toString();

      if (!employeeRatingsMap[employeeId]) {
        employeeRatingsMap[employeeId] = {
          employee: rating.ratedEmployee,
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

    // Calculate average rating for each employee
    const employeeRatings = Object.values(employeeRatingsMap).map(employeeData => ({
      employee: employeeData.employee,
      averageRating: (employeeData.totalRating / employeeData.ratingCount).toFixed(2),
      ratings: employeeData.ratings,
    }));

    // Send the grouped data as a response
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
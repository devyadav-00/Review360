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
  

// get average ratings for each employee (for employer view)
  


export {
    createRating,
    getMyRatings
}
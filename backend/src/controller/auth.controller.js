import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if user exists using findOneAndUpdate with upsert
    // This prevents race conditions and handles duplicates elegantly
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          fullName: `${firstName} ${lastName}`,
          imageUrl,
          // Add lastLoginAt to track user activity
          lastLoginAt: new Date()
        }
      },
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return updated document
        runValidators: true // Run model validators
      }
    );

    res.status(200).json({
      success: true,
      message: "User synchronized successfully",
      data: {
        userId: user._id,
        fullName: user.fullName
      }
    });
    
  } catch (error) {
    console.error("Error in auth callback:", error);
    
    // Handle specific error cases
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        error: "DUPLICATE_USER"
      });
    }
    
    // Pass error to error handling middleware
    next(error);
  }
};
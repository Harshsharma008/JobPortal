import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res, message) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
      expires: new Date(
        Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  } catch (error) {
    console.error("Error processing token:", error);
    // Handle error appropriately
    res.status(500).json({ success: false, message: "Token generation failed" });
  }
};
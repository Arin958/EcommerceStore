const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("../../config/email");

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const verificationToken = crypto.randomInt(100000, 1000000).toString(); // Generate a random 6-digit verification token

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 24 hours
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({ verificationToken: code });

    // 1. If no matching token
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // 2. If token expired
    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Verification token has expired",
      });
    }

    // 3. If account is locked due to too many failed attempts
    if (
      user.verificationLockedUntil &&
      user.verificationLockedUntil > new Date()
    ) {
      return res.status(403).json({
        success: false,
        message: `Too many failed attempts. Try again after ${user.verificationLockedUntil.toLocaleTimeString()}`,
      });
    }

    // 4. If token matches
    if (user.verificationToken === code) {
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      user.verificationAttempts = 0;
      user.verificationLockedUntil = undefined;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    }

    // 5. If code is wrong
    user.verificationAttempts += 1;

    // 6. Lock account if too many failed attempts
    if (user.verificationAttempts >= 5) {
      user.verificationLockedUntil = new Date(Date.now() + 60 * 60 * 1000); // lock for 1 hour
      await user.save();
      return res.status(403).json({
        success: false,
        message: "Too many failed attempts. Try again after 1 hour.",
      });
    }

    await user.save();

    return res.status(400).json({
      success: false,
      message: "Invalid verification code",
    });
  } catch (error) {
    console.error("verifyEmail Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not Authorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User authorized",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("checkAuth Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already verified" });
    }

    // Optional: Rate limit logic (to avoid abuse)
    const lockDuration = 5 * 60 * 1000; // 5 minutes lock between resends
    if (
      user.lastVerificationSentAt &&
      Date.now() - new Date(user.lastVerificationSentAt).getTime() <
        lockDuration
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait a few minutes before requesting another code",
      });
    }

    // Generate new 6-digit code
    const newToken = crypto.randomInt(100000, 1000000).toString();
    user.verificationToken = newToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h expiry
    user.lastVerificationSentAt = new Date(); // For rate limiting

    await user.save();

    await sendVerificationEmail(user.email, newToken);

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    console.error("Resend email error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "If an account exists with this email, a reset link has been sent to your email address.",
      });
    }

    const resetToken = crypto.randomInt(100000, 1000000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 expiry
    await user.save();

    await sendPasswordResetEmail(user.email, resetToken);

    return res.status(200).json({
      success: true,
      message:
        "Password reset instructions sent to your email. Please check your inbox.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = newPassword; // ❗ Don't hash here
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save(); // pre-save hook will hash

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

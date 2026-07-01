import User from "../models/User.js";

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (existingUser) {
      res.status(400);
      return next(new Error("Email is already in use"));
    }

    req.user.name = name;
    req.user.email = email;
    await req.user.save();

    res.json({
      success: true,
      data: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.matchPassword(currentPassword))) {
      res.status(401);
      return next(new Error("Current password is incorrect"));
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, data: { message: "Password updated" } });
  } catch (error) {
    next(error);
  }
};

export { updateProfile, updatePassword };

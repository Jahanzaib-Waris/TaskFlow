import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import FormInput from "../components/FormInput";
import * as userService from "../services/userService";
import getErrorMessage from "../utils/getErrorMessage";
import { profileSchema, passwordSchema } from "../utils/validationSchemas";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onProfileSubmit = async (values) => {
    try {
      const updated = await userService.updateProfile(values);
      updateUser(updated);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onPasswordSubmit = async ({ currentPassword, newPassword }) => {
    try {
      await userService.updatePassword({ currentPassword, newPassword });
      toast.success("Password updated");
      passwordForm.reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Profile</h1>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-violet-900/40 dark:bg-[#12121c]">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Account details
        </h2>
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="flex flex-col gap-4"
        >
          <FormInput
            label="Name"
            error={profileForm.formState.errors.name?.message}
            registration={profileForm.register("name")}
          />
          <FormInput
            label="Email"
            type="email"
            error={profileForm.formState.errors.email?.message}
            registration={profileForm.register("email")}
          />
          <button
            type="submit"
            disabled={profileForm.formState.isSubmitting}
            className="self-start rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-violet-500 hover:to-purple-500 disabled:opacity-60"
          >
            {profileForm.formState.isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-violet-900/40 dark:bg-[#12121c]">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Change password
        </h2>
        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="flex flex-col gap-4"
        >
          <FormInput
            label="Current password"
            type="password"
            error={passwordForm.formState.errors.currentPassword?.message}
            registration={passwordForm.register("currentPassword")}
          />
          <FormInput
            label="New password"
            type="password"
            error={passwordForm.formState.errors.newPassword?.message}
            registration={passwordForm.register("newPassword")}
          />
          <FormInput
            label="Confirm new password"
            type="password"
            error={passwordForm.formState.errors.confirmPassword?.message}
            registration={passwordForm.register("confirmPassword")}
          />
          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="self-start rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-violet-500 hover:to-purple-500 disabled:opacity-60"
          >
            {passwordForm.formState.isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

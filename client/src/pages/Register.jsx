import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import FormInput from "../components/FormInput";
import ThemeToggle from "../components/ThemeToggle";
import getErrorMessage from "../utils/getErrorMessage";
import { registerSchema } from "../utils/validationSchemas";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async ({ name, email, password }) => {
    try {
      await registerUser(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-violet-900/40 dark:bg-[#12121c] dark:shadow-[0_0_35px_rgba(139,92,246,0.12)]">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Create your{" "}
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </span>{" "}
          account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            label="Name"
            error={errors.name?.message}
            registration={register("name")}
          />
          <FormInput
            label="Email"
            type="email"
            error={errors.email?.message}
            registration={register("email")}
          />
          <FormInput
            label="Password"
            type="password"
            error={errors.password?.message}
            registration={register("password")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-violet-500 hover:to-purple-500 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-violet-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

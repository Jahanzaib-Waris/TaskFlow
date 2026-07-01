import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import FormInput from "../components/FormInput";
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Create your account
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
            className="mt-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { signIn } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { SITE } from "../../constants/site.js";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    document.title = "Admin Login | Meera Silks";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || "/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError("");
    try {
      await signIn(data.email, data.password);
      toast.success("Welcome back");
    } catch (err) {
      setLoginError("Incorrect email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-cream">
      <div className="card-boutique w-full max-w-sm p-8">
        <p className="zari-rule mb-4 mx-auto" />
        <h1 className="text-2xl text-center mb-1">{SITE.name}</h1>
        <p className="text-center text-ink/50 font-body text-sm mb-6">Admin Dashboard Login</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-body mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-body mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {loginError && <p className="text-red-600 text-sm" role="alert">{loginError}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

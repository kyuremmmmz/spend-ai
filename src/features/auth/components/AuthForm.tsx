import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AuthFormProps } from "../models/props";
import { usePathname } from "next/navigation";
import Loading from "@/shared/components/Loading";


export default function AuthForm({
    showPassword,
    handleToggle,
    action,
    errorsLogin,
    errorsSignup,
    isLoading,
}: AuthFormProps) {
  const path = usePathname();
  const isSignUpValidation = path === "/signup" ? errorsSignup : errorsLogin;
    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center pb-0">
        <div className="w-full max-w-md ">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{path === "/signup" ? "Create Account" : "Log In"}</h2>
          <p className="text-gray-600 mb-8">Start tracking your expenses intelligently.</p>

          {/* Google Sign Up */}
          {path === "/signup" ? (
            <button className="w-full bg-white border text-black border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mb-6">
              <FcGoogle size={20} />
              Sign up with Google
            </button>
          ) :  <button className="w-full bg-white border text-black border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mb-6">
              <FcGoogle size={20} />
              Sign in with Google
            </button>}

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600 text-xs font-semibold uppercase tracking-wide">
                OR {path === "/signup" ? "REGISTER" : "LOG IN"} WITH EMAIL
              </span>
            </div>
          </div>

          <form action={action} className="space-y-4">
            {/* Full Name */}
                {(path === "/signup") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Jane Doe"
                          name="name"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        {isSignUpValidation?.name && (
                          <p className="text-xs text-red-600 mt-2">
                            {isSignUpValidation.name[0]}
                          </p>
                        )}
                      </div>
                    )}

            {/* Work Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Work Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {isSignUpValidation?.email && <p className="text-xs text-red-600 mt-2">{isSignUpValidation.email[0]}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  name="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                            </button>
              {isSignUpValidation?.password && <p className="text-xs text-red-600 mt-2">{isSignUpValidation.password[0]}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full flex items-center justify-center ${path === "/signup" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} text-white font-semibold rounded-lg py-3 px-4 transition-colors mt-6`}
            >
              {isLoading ? (path === "/signup" ? "Creating Account..." : <Loading state={"loading"} />) : (path === "/signup" ? "Create Account" : "Log In")}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6 cursor-pointer">
            {path === "/signup" ? "Already have an account? " : "Don't have an account? "}
            <Link href={path === "/signup" ? "/login" : "/signup"} className="text-blue-600 hover:text-blue-700 font-semibold">
              {path === "/signup" ? "Log in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    )
}
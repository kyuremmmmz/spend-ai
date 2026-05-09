import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

interface AuthFormProps{
    handleSubmit: (e: React.FormEvent) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    fullName: string;
    setFullName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

export default function AuthForm({
    handleSubmit,
    showPassword,
    setShowPassword,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword
}: AuthFormProps) {
    return (
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600 mb-8">Start tracking your expenses intelligently.</p>

          {/* Google Sign Up */}
          <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-6 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium text-gray-700">
            <FcGoogle size={20}/>
            Sign up with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600 text-xs font-semibold uppercase tracking-wide">
                OR REGISTER WITH EMAIL
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Work Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 px-4 transition-colors mt-6"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    )
}
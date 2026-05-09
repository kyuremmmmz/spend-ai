'use client';

import AuthForm from "./AuthForm";

export default function AuthPageClient() {
    return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-50 to-green-50 flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <div className="bg-blue-600 text-white rounded-lg p-2 w-10 h-10 flex items-center justify-center font-bold">
              $
            </div>
            <span className="text-2xl font-bold text-gray-900">SpendAI</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Intelligent expense management for modern teams.
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Automate your financial workflows, gain real-time insights, and take control of your corporate spending with our advanced AI platform.
          </p>
        </div>

        {/* Dashboard Mock */}
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-gray-900 p-6 aspect-video flex items-center justify-center">
            <div className="w-full h-full bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg opacity-30 flex items-center justify-center">
              <div className="text-center text-white text-sm">Dashboard Preview</div>
            </div>
          </div>
        </div>
      </div>
    <AuthForm handleSubmit={function (e: React.FormEvent): void {
                throw new Error("Function not implemented.");
            } } showPassword={false} setShowPassword={function (show: boolean): void {
                throw new Error("Function not implemented.");
            } } fullName={""} setFullName={function (name: string): void {
                throw new Error("Function not implemented.");
            } } email={""} setEmail={function (email: string): void {
                throw new Error("Function not implemented.");
            } } password={""} setPassword={function (password: string): void {
                throw new Error("Function not implemented.");
            } }        
    />
    </div>
    )
}
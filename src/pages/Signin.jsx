
export const Signin = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className="bg-white rounded-3xl w-[90%] p-4 md:w-[60%] md:p-10 lg:w-[35%] lg:p-16">
        <p className="font-[500] text-3xl text-center">Sign In</p>

        <div className="mt-4 flex flex-col gap-6">
          <div className="shadow-md rounded-2xl p-2 bg-white">
            <input placeholder="E-mail" className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" />
          </div>

          <div className="shadow-md rounded-2xl p-2 bg-white">
            <input placeholder="Password" className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" />
          </div>
        </div>

        <div className="flex justify-between mt-3 w-[90%] mx-auto">
          <div className="flex items-center gap-2">
            <input type='checkbox' className="accent-red-500 border border-red-500" />
            <p className="text-red-400 text-sm">Remember me</p>
          </div>
          <div>
            <p className="text-red-400 text-sm cursor-pointer">Forgot password?</p>
          </div>
        </div>

        <div className="w-[50%] mx-auto mt-6">
          <button className="w-[100%] p-2 bg-red-600 rounded-3xl text-white font-semibold shadow-lg">
            SIGN IN
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-5">
            <p className="text-red-400 text-sm">Don't have an account?</p>
            <p className="text-red-400 text-sm font-semibold cursor-pointer">Create</p>
        </div>
      </div>
    </div>
  )
}

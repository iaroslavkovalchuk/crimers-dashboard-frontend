import { usePassword } from "../hooks/usePassword"

export const Signin = () => {
  const [showPassword, showPass, hidePass] = usePassword()

  return (
    <div className="w-[100%] h-[100vh] flex flex-col gap-6 justify-center items-center bg-cover bg-[url('https://w0.peakpx.com/wallpaper/250/790/HD-wallpaper-stoneage-house-old-home-side-of-hill-dark-sky.jpg')]">
      <div className="w-96">
        <img src="https://delmar-react-tailwind.vercel.app/static/media/logo.9f804465c04a053b763ff5493042c6f5.svg" alt="logo" 
          className="w-[100%] h-[100%]"
        />
      </div>

      <div className="bg-white rounded-3xl w-[90%] p-4 md:w-[60%] md:p-10 lg:w-[35%] lg:p-16">
        <p className="font-[500] text-3xl text-center">Sign In</p>

        <div className="mt-4 flex flex-col gap-6">
          <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
            <div className="w-7">
              <img src="https://delmar-react-tailwind.vercel.app/static/media/email.b49826fce354b47df4ea66518a70a532.svg" alt="image" 
                className="w-[100%] h-[100%]"
              />
            </div>
            <input placeholder="E-mail" className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" />
          </div>

          <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
            <div className="w-12">
              <img src="https://delmar-react-tailwind.vercel.app/static/media/password.0baf6a7cbb9d864baf542676971cdaa9.svg" alt="image" 
                className="w-[100%] h-[100%]"
              />
            </div>
            <input placeholder="Password" type={showPassword ? "password": "text"} className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" />
            <div className="w-10">
              { showPassword ? <img src="https://delmar-react-tailwind.vercel.app/static/media/eye-lock.d107eb1ce1b5084858dc197fcebf2cf4.svg" alt="image" 
                className="w-[100%] h-[100%] cursor-pointer"  onClick={hidePass}
              /> :
              <img src="https://delmar-react-tailwind.vercel.app/static/media/eye.d0bc4ebd567464de6ea6c8aacbbed3a1.svg" alt="image" 
                className="w-[100%] h-[100%] cursor-pointer" onClick={showPass}
              /> }
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3 w-[90%] mx-auto">
          <div className="flex items-center gap-2">
            <input type='checkbox' className="accent-red-500" />
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

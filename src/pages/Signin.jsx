import { Link, useNavigate } from "react-router-dom"
import { usePassword } from "../hooks/usePassword"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loadingOff, loadingOn } from "../store/authSlice"
import { signinUser } from "../services/auth"
import logo from "../assets/logo.svg"
import mailPNG from "../assets/email.svg"
import eyePNG from "../assets/eye.svg"
import showPNG from "../assets/show.svg"
import lockPNG from "../assets/lock.png"

export const Signin = () => {
  const [showPassword, showPass, hidePass] = usePassword()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleSignin = async () => {
    if (!userInfo.email || !userInfo.password) {
      alert('Signin fields cannot be empty!');
      return;
    }
    dispatch(loadingOn())
    const res = await signinUser({...userInfo})

    dispatch(loadingOff())
    if (res['detail']) {
      alert(res.detail);
      return;
    }
    if (res['access_token']) {
      alert("You signed in successfully");
      localStorage.setItem('access_token', res.access_token)
      navigate('/notifications')
    }
    else{
      alert("Email or Password are incorrect!");
    }
  }

  const handleForgotPassword = async() => {
      navigate('/forgot-password');
  }

  return (
    <div className="w-[100%] h-[100vh] flex flex-col gap-6 justify-center items-center bg-cover bg-[url('/bg.png')]">
      <div className="w-96">
        <img src={logo} alt="logo" 
          className="w-[100%] h-[100%]"
        />
      </div>

      <div className="bg-white rounded-3xl w-[90%] p-4 md:w-[60%] md:p-10 lg:w-[35%] lg:p-16">
        <p className="font-[500] text-3xl text-center">Sign In</p>

        <div className="mt-4 flex flex-col gap-6">
          <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
            <div className="w-7">
              <img src={mailPNG} alt="image" 
                className="w-[100%] h-[100%]"
              />
            </div>
            <input placeholder="E-mail" className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
              name="email" onChange={handleChange} value={userInfo.email}
            />
          </div>

          <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
            <div className="w-12">
              <img src={lockPNG} alt="image" 
                className="w-[100%] h-[100%]"
              />
            </div>
            <input placeholder="Password" type={showPassword ? "password": "text"} className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
              name="password" onChange={handleChange} value={userInfo.password}
            />
            <div className="w-10">
              { showPassword ? <img src={eyePNG} alt="image" 
                className="w-[100%] h-[100%] cursor-pointer"  onClick={hidePass}
              /> :
              <img src={showPNG} alt="image" 
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
            <p className="text-red-400 text-sm cursor-pointer" onClick={handleForgotPassword}>Forgot password?</p>
          </div>
        </div>

        <div className="w-[50%] mx-auto mt-6">
          <button className="w-[100%] p-2 bg-red-600 rounded-3xl text-white font-semibold shadow-lg" onClick={handleSignin}>
            SIGN IN
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-5">
            <p className="text-red-400 text-sm">Don't have an account?</p>
            <p className="text-red-400 text-sm font-semibold cursor-pointer">
              <Link to="/signup">Create</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
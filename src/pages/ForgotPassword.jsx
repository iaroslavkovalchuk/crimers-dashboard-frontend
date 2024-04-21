import { Link, useNavigate, useParams } from "react-router-dom"
import { usePassword } from "../hooks/usePassword"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {loadingOff, loadingOn} from '../store/authSlice'
import { changePassword, confirmEmail } from "../services/auth"

export const ForgotPassword = () => {
  const [showPassword, showPass, hidePass] = usePassword()
  const [userInfo, setUserInfo] = useState({
    email: '',
    newPassword: ''
  })
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const { forgotPasswordToken } = useParams();
  console.log(forgotPasswordToken);

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

  const handleChangePassword = async () => {
    if (!userInfo.email || !userInfo.newPassword) {
      alert('Fields cannot be empty!');
      return;
    }
    dispatch(loadingOn())
    console.log(forgotPasswordToken);
    const res = await changePassword({
      "token": forgotPasswordToken,
      ...userInfo
    })
    
    dispatch(loadingOff())
    if (typeof res === 'string') {
      alert(res);
      return;
    }
    if (res.success) {
      alert("Password changed successfully!");
      navigate('/signin')
    }
    else{
      alert("Unkown Error!")
    }
  }

  const handleConfirmEmail = async () => {
    if (!userInfo.email) {
      alert('Email field cannot be empty!');
      return;
    }
    dispatch(loadingOn())
    console.log(forgotPasswordToken);
    const res = await confirmEmail({
      "email": userInfo.email
    })
    
    dispatch(loadingOff())
    if (typeof res === 'string') {
      alert(res);
      return;
    }
    if (res.success) {
      alert("Chnage Password URL was sent to your email address!")
    }
    else{
      alert("Unkown Error!")
    }
  }

  useEffect(() =>{
    if(forgotPasswordToken) setIsConfirmEmail(true);
  }, [forgotPasswordToken])

  return (
    <div className="w-[100%] h-[100vh] flex flex-col gap-6 justify-center items-center bg-cover bg-[url('/bg.png')]">
      <div className="w-96">
        <img src="https://delmar-react-tailwind.vercel.app/static/media/logo.9f804465c04a053b763ff5493042c6f5.svg" alt="logo" 
          className="w-[100%] h-[100%]"
        />
      </div>

      <div className="bg-white rounded-3xl w-[90%] p-4 md:w-[60%] md:p-10 lg:w-[35%] lg:p-16">
        <p className="font-[500] text-3xl text-center">Forgot Password</p>

        <div className="mt-4 flex flex-col gap-6">
            <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
                <div className="w-7">
                <img src="https://delmar-react-tailwind.vercel.app/static/media/email.b49826fce354b47df4ea66518a70a532.svg" alt="image" 
                    className="w-[100%] h-[100%]"
                />
                </div>
                <input placeholder="E-mail" className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
                  name='email' onChange={handleChange} value={userInfo.email}
                />
            </div>

            {isConfirmEmail && (
              <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
                <div className="w-12">
                <img src="https://delmar-react-tailwind.vercel.app/static/media/password.0baf6a7cbb9d864baf542676971cdaa9.svg" alt="image" 
                    className="w-[100%] h-[100%]"
                />
                </div>
                <input placeholder="New Password" type={showPassword ? "password": "text"} className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
                  name='newPassword' onChange={handleChange} value={userInfo.newPassword}
                />
                <div className="w-10">
                { showPassword ? <img src="https://delmar-react-tailwind.vercel.app/static/media/eye-lock.d107eb1ce1b5084858dc197fcebf2cf4.svg" alt="image" 
                    className="w-[100%] h-[100%] cursor-pointer"  onClick={hidePass}
                /> :
                <img src="https://delmar-react-tailwind.vercel.app/static/media/eye.d0bc4ebd567464de6ea6c8aacbbed3a1.svg" alt="image" 
                    className="w-[100%] h-[100%] cursor-pointer" onClick={showPass}
                /> }
                </div>
            </div>
            )}
            
        </div>

        <div className="w-[50%] mx-auto mt-6">
          {
            isConfirmEmail ? (
              <button className="w-[100%] p-2 bg-red-600 rounded-3xl text-white font-semibold shadow-lg"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            ) : (
              <button className="w-[100%] p-2 bg-red-600 rounded-3xl text-white font-semibold shadow-lg"
                onClick={handleConfirmEmail}
              >
                Confirm Email
              </button>
            )
          }
        </div>

        <div className="flex justify-center gap-2 mt-5">
            <p className="text-red-400 text-sm font-semibold cursor-pointer">
                <Link to="/signin">Sign In</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

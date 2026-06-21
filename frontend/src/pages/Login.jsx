import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()

    // ==========================
    // LOGIN / SIGNUP MODE
    // ==========================
    const [currentState, setCurrentState] = useState('Login')

    // ==========================
    // FORM DATA
    // ==========================
    const [formData, setFormData] = useState({

        name: '',
        email: '',
        password: ''

    })

    // ==========================
    // HANDLE INPUT
    // ==========================
    const onChangeHandler = (event) => {

        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    // ==========================
    // REDIRECT IF LOGGED IN
    // ==========================
    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {

            navigate('/')

        }

    }, [])

    // ==========================
    // FORM SUBMIT
    // ==========================
    const onSubmitHandler = (event) => {

        event.preventDefault()

        // EMAIL VALIDATION
        if (!formData.email.includes('@')) {

            toast.error('Enter valid email')
            return
        }

        // PASSWORD VALIDATION
        if (formData.password.length < 6) {

            toast.error('Password must be at least 6 characters')
            return
        }

        // ==========================
        // SIGNUP
        // ==========================
        if (currentState === 'Sign Up') {

            if (!formData.name) {

                toast.error('Enter your name')
                return
            }

            // GET USERS
            const users =
                JSON.parse(localStorage.getItem('users')) || []

            // CHECK EXISTING USER
            const userExists = users.find(
                user => user.email === formData.email
            )

            if (userExists) {

                toast.error('User already exists')
                return
            }

            // CREATE NEW USER
            const newUser = {

                name: formData.name,
                email: formData.email,
                password: formData.password

            }

            // SAVE USERS
            users.push(newUser)

            localStorage.setItem(
                'users',
                JSON.stringify(users)
            )

            // LOGIN USER
            localStorage.setItem('token', 'user_logged_in')

            localStorage.setItem(
                'currentUser',
                JSON.stringify(newUser)
            )

            toast.success('Account Created Successfully 🎉')

            setTimeout(() => {

                navigate('/')

            }, 1500)

        }

        // ==========================
        // LOGIN
        // ==========================
        else {

            const users =
                JSON.parse(localStorage.getItem('users')) || []

            // FIND USER
            const matchedUser = users.find(
                user =>
                    user.email === formData.email &&
                    user.password === formData.password
            )

            // WRONG LOGIN
            if (!matchedUser) {

                toast.error('Invalid Email or Password')
                return
            }

            // SAVE LOGIN
            localStorage.setItem(
                'token',
                'user_logged_in'
            )

            localStorage.setItem(
                'currentUser',
                JSON.stringify(matchedUser)
            )

            toast.success('Login Successful ✅')

            setTimeout(() => {

                navigate('/')

            }, 1500)

        }

    }

    return (

        <div className='min-h-[80vh] flex items-center justify-center'>

            <form
                onSubmit={onSubmitHandler}
                className='w-full sm:max-w-[450px] border rounded-2xl shadow-lg p-8'
            >

                {/* TITLE */}
                <div className='text-center mb-8'>

                    <h1 className='text-3xl font-bold'>

                        {
                            currentState
                        }

                    </h1>

                    <p className='text-gray-500 mt-2'>

                        Welcome to Stylentra Fashion Store

                    </p>

                </div>

                {/* NAME */}
                {
                    currentState === 'Sign Up' && (

                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={onChangeHandler}
                            placeholder='Full Name'
                            className='w-full border px-4 py-3 rounded-xl mb-4 outline-none'
                        />

                    )
                }

                {/* EMAIL */}
                <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={onChangeHandler}
                    placeholder='Email Address'
                    className='w-full border px-4 py-3 rounded-xl mb-4 outline-none'
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={onChangeHandler}
                    placeholder='Password'
                    className='w-full border px-4 py-3 rounded-xl mb-2 outline-none'
                />

                {/* OPTIONS */}
                <div className='flex justify-between text-sm text-gray-600 mb-6'>

                    <p className='cursor-pointer hover:text-black'>
                        Forgot Password?
                    </p>

                    {
                        currentState === 'Login'
                            ? (
                                <p
                                    onClick={() => setCurrentState('Sign Up')}
                                    className='cursor-pointer hover:text-black'
                                >
                                    Create Account
                                </p>
                            )
                            : (
                                <p
                                    onClick={() => setCurrentState('Login')}
                                    className='cursor-pointer hover:text-black'
                                >
                                    Login Here
                                </p>
                            )
                    }

                </div>

                {/* BUTTON */}
                <button
                    type='submit'
                    className='w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition'
                >

                    {
                        currentState === 'Login'
                            ? 'Login'
                            : 'Create Account'
                    }

                </button>

                {/* EXTRA */}
                <div className='text-center mt-6 text-sm text-gray-500'>

                    {
                        currentState === 'Login'
                            ? (
                                <p>

                                    New to Stylentra?

                                    <span
                                        onClick={() => setCurrentState('Sign Up')}
                                        className='text-black cursor-pointer ml-1 font-medium'
                                    >
                                        Create Account
                                    </span>

                                </p>
                            )
                            : (
                                <p>

                                    Already have an account?

                                    <span
                                        onClick={() => setCurrentState('Login')}
                                        className='text-black cursor-pointer ml-1 font-medium'
                                    >
                                        Login
                                    </span>

                                </p>
                            )
                    }

                </div>

            </form>

        </div>
    )
}

export default Login
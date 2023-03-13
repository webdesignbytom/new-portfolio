import React from 'react';
import { Link } from 'react-router-dom';

function LoginForm({
  handleLogin,
  handleChange,
  fieldType,
  setFieldType,
  showPassword,
  eyeIcon,
  setEyeIcon,
  rememberMeChecked,
  setRememberMeChecked,
  successLoginUser,
  loadingAnimation,
}) {
  return (
    <>
      <form
        onSubmit={handleLogin}
        className='py-4 lg:w-full lg:my-auto lg:px-8'
      >
        {/* <!-- Email input --> */}
        <div className='mb-6'>
          <input
            type='text'
            name='email'
            className='standard__inputs'
            placeholder='Email address'
            onChange={handleChange}
          />
        </div>

        {/* <!-- Password input --> */}
        <div className='mb-6 relative flex z-0'>
          <input
            type={fieldType}
            name='password'
            className='standard__inputs'
            placeholder='Password'
            onChange={handleChange}
          />
          <label
            className='px-2 py-1 text-sm text-red-500 font-mono cursor-pointer absolute right-0'
            htmlFor='toggle'
          >
            <img
              onClick={() => showPassword(fieldType, setFieldType, setEyeIcon)}
              src={eyeIcon}
              className='h-6 w-6 my-2 mr-2'
              alt='open eye'
            />
          </label>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <div className='form-group form-check'>
            <input
              type='checkbox'
              className='form-check-input h-4 w-4 border border-main-colour rounded-sm bg-white checked:bg-main-colour checked:border-gray-900 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              id='rememberMeChecked'
              checked={rememberMeChecked}
              onChange={() => {
                setRememberMeChecked(!rememberMeChecked);
              }}
            />
            <label
              className='form-check-label inline-block text-gray-800 dark:text-white'
              htmlFor='rememberMeChecked'
            >
              Remember me
            </label>
          </div>
          <Link
            to='/reset-lost-password'
            className='text-hyperlink-blue dark:text-white hover:text-main-colour-med focus:text-main-colour-med active:text-main-colour-dark duration-200 transition ease-in-out'
          >
            Forgot password?
          </Link>
        </div>

        {successLoginUser && <p>Success</p>}

        {/* <!-- Submit button --> */}
        <div className='mb-2'>
          <button
            type='submit'
            className='submit__button'
            data-mdb-ripple='true'
            data-mdb-ripple-color='light'
          >
            {loadingAnimation ? (
              <div>
                <svg
                  className='w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </div>

        <div className='mb-6 text-center'>
          <Link to='/register'>
            <p>
              Not a member? Click{' '}
              <span className='text-hyperlink-blue'>here</span> to register
            </p>
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;

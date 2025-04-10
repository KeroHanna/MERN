import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../assets/components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  //console.log(data);

  const formData = await request.formData();
  //console.log(formData);

  const data = Object.fromEntries(formData);
  //console.log(data);

  try {
    await customFetch.post('/auth/register', data);
    //toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    //console.log(error);
    //toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow
          type='text'
          name='lastName'
          labelText='last name'
          defaultValue='smith'
        />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;

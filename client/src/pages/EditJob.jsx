import { FormRow, FormRowSelect, SubmitBtn } from '../assets/components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  //console.log(params);
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    return redirect('/dashboard/all-jobs');
  }

  return null;
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    return error;
  }

  return null;
};

const EditJob = () => {
  // const params = useParams();
  // console.log(params);

  const { job } = useLoaderData();
  console.log(job);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.JOB_STATUS}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.JOB_TYPE}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

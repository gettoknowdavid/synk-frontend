import React from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/react';
import FacultyCourses from '../contents/courses/faculty-courses';
import StudentCourses from '../contents/courses/student-courses';
import Layout from '../components/layout';
import Attendance from './attendance';

function Courses({ role }) {
  switch (role) {
    case 'faculty':
      return (<FacultyCourses />);
    case 'student':
      return (<StudentCourses />);
    default:
      return null;
  }
}

Courses.propTypes = {
  role: PropTypes.string.isRequired,
};

Courses.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Courses;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        source: '/courses',
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const { role } = session.user;

  return { props: { session, role } };
}

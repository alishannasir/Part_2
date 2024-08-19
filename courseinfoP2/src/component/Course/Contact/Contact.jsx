import React from 'react';

const Contact = ({ contactdata }) => {
  return (
    <div>
      {contactdata.map((course, courseId) => (
        <div key={courseId}>
          <h2>{course.name}</h2>
          {course.parts.map((part, partId) => (
            <p key={partId}>
              {part.name} {part.exercise}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Contact;

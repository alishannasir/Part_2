import React from 'react'
import Header from './Header/Header';
import Total from './Total/Total';
import Contact from './Contact/Contact';


const Data = [
    {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercise: 10,
        },
        {
          name: "Using props to pass data",
          exercise: 7,
        },
        {
          name: "State of a component",
          exercise: 14,
        },
        {
          name:"redux",
          exercise: 11
        }
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercise: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercise: 7,
          id: 2
        }
      ]
    }
  ]

  // Calculate total exercises
  const totalExercises = Data.reduce((sum, part) =>{
    const sumOfExercise = part.parts.reduce((initail, add)=>{
            return initail + add.exercise
    }, 0)
    return sum + sumOfExercise;
  } , 0);

function Course() {
  return (
    <>
       <Header name={Data[0].name} />
      <Contact contactdata={Data} />
      <Total 
         total={totalExercises} 
       />
    </>
  )
}

export default Course
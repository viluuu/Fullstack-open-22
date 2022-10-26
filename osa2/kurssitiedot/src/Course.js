const Course = ({course}) => {

    return (
       <div>
         <div>
           {course.map(header =>
           <div key={header.id}>
            <h1 key={header.id}>
              {header.name}
            </h1>
            {header.parts.map(part =>
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
              )}
            <b> total of {header.parts.map(count =>
               count.exercises).reduce((prev, curr) => prev + curr, 0)} excercises </b>
            </div>
            )}
         </div>
       </div>
    )
  }

  export default Course
import { useEffect, useContext } from "react";
import { Data } from "../context/WorkOutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Records = () => {
  const{user} = useAuthContext();
  const { workouts, deleteWorkout, toggleUpdate, getWorkouts } =
    useContext(Data);

  useEffect(() => {
    if(user){
    getWorkouts();
    }

  }, [user]);

  return (
    <div className="pt-2">
      {workouts &&
        workouts.map((item) => {
          return (
            <div
              key={item._id}
              className="flex relative flex-col  gap-1 p-4 justify-start my-2 w-96 h-34  rounded bg-gray-100 shadow-xl"
            >
              <h1 className="font-bold text-xl text-green-700 ">
                Exercise: {item.title}
              </h1>
              <p>Reps: {item.reps}</p>
              <p>Load(Kg): {item.load}</p>
              <div
                className="mt-2 flex gap-2 absolute bottom-2 left-2 sm:top-2 sm:right-2 sm:bottom-auto sm:left-auto"
              >
                <button
                  className=" active:scale-90 active:translate-z-1 hover:cursor-pointer bg-gray-400 rounded p-1"
                  onClick={() => toggleUpdate(item)}
                >
                  Edit
                </button>

                <button
                  className=" active:scale-90 active:translate-z-1 hover:cursor-pointer bg-gray-400 rounded p-1"
                  onClick={() => deleteWorkout(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Records;

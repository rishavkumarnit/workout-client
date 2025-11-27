import { createContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const Data = createContext();

const WorkOutContext = ({ children }) => {
  const [workouts, setWorkouts] = useState(null);
  const { user } = useAuthContext();

  const getWorkouts = async () => {
    const response = await axios.get("https://workout-server-ptc4.onrender.com/api/workouts/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setWorkouts(response.data);
  };

  const deleteWorkout = async (id) => {
    await axios.delete(`https://workout-server-ptc4.onrender.com/api/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    getWorkouts();
    setUpdateForm({
      _id: null,
      title: "",
      reps: "",
      load: "",
    });
  };

  const [form, setForm] = useState({
    title: "",
    reps: "",
    load: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    reps: "",
    load: "",
  });

  const toggleUpdate = async (item) => {
    setUpdateForm({
      _id: item._id,
      title: item.title,
      reps: item.reps,
      load: item.load,
    });
  };

  return (
    <div>
      <Data.Provider
        value={{
          updateForm,
          setUpdateForm,
          getWorkouts,
          deleteWorkout,
          toggleUpdate,
          workouts,
          setWorkouts,
          form,
          setForm,
        }}
      >
        {children}
      </Data.Provider>
    </div>
  );
};

export default WorkOutContext;

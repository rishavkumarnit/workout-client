import axios from "axios";
import { useContext } from "react";
import { Data } from "../context/WorkOutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Form = () => {
  const { user } = useAuthContext();
  const { updateForm, setUpdateForm, getWorkouts, workouts, form, setForm } =
    useContext(Data);

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createWorkout = async (e) => {
    e.preventDefault();
    if (form.title === "" || isNaN(form.reps) || isNaN(form.load)) {
      alert("Invalid data");
      return;
    }
    if (workouts.length >= 5) {
      alert("It's just a project!! delete some workouts!!");
      return;
    }

    await axios.post("https://workout-server-ptc4.onrender.com/api/workouts/", form, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    getWorkouts();
    setForm({ title: "", reps: "", load: "" });
  };

  const updateWorkout = async (e) => {
    e.preventDefault();
    const { _id, title, reps, load } = updateForm;
    await axios.patch(
      `https://workout-server-ptc4.onrender.com/api/workouts/${_id}`,
      {
        title,
        reps,
        load,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setUpdateForm({ _id: "", title: "", reps: "", load: "" });
    getWorkouts();
  };

  const handleEditfieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  return (
    <div className="bg-gray-100 w-[30%] h-[70%] shadow-xl rounded mt-2  text-[100%]">
      {!updateForm._id && (
        <form
          className="flex flex-wrap sm:flex-col gap-4 justify-start p-2"
          onSubmit={createWorkout}
        >
          <h1 className="font-bold sm:text-2xl text-xl text-red-400">
            Create Record
          </h1>
          <div className="flex sm:flex-col flex-wrap justify-between gap-1 my-2">
            <label>Title</label>
            <input
              type="text"
              onChange={updateFormFields}
              className="border border-black p-1  rounded w-[50%] sm:w-full"
              name="title"
              value={form.title}
            ></input>
          </div>

          <div className="flex sm:flex-col flex-wrap justify-between gap-1 my-2">
            <label>Reps</label>
            <input
              type="text"
              onChange={updateFormFields}
              className="border border-black p-1  rounded w-[50%] sm:w-full"
              name="reps"
              value={form.reps}
            ></input>
          </div>

          <div className="flex sm:flex-col flex-wrap justify-between gap-1 my-2">
            <label>Load</label>
            <input
              type="text"
              onChange={updateFormFields}
              className="border border-black p-1  rounded w-[50%] sm:w-full"
              name="load"
              value={form.load}
            ></input>
          </div>

          <button className=" active:scale-90 active:translate-z-1 hover:cursor-pointer p-1 bg-gray-400 rounded">
            Submit
          </button>
        </form>
      )}
      {updateForm._id && (
        <form
          className="flex flex-col gap-4 justify-start rounded p-2"
          onSubmit={updateWorkout}
        >
          <h1 className="font-bold text-2xl text-red-400">Edit Record</h1>
          <div>
            <label>Title</label>
            <input
              type="text"
              onChange={handleEditfieldChange}
              className="border border-black p-1 m-1 rounded"
              name="title"
              value={updateForm.title}
            ></input>
          </div>

          <div>
            <label>Reps</label>
            <input
              type="text"
              onChange={handleEditfieldChange}
              className="border border-black p-1 m-1 rounded"
              name="reps"
              value={updateForm.reps}
            ></input>
          </div>

          <div>
            <label>Load</label>
            <input
              type="text"
              onChange={handleEditfieldChange}
              className="border border-black p-1 m-1 rounded"
              name="load"
              value={updateForm.load}
            ></input>
          </div>

          <button className=" active:scale-90 active:translate-z-1 hover:cursor-pointer p-1  bg-gray-400 rounded">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;

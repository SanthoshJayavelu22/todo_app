import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const apiUrl = "https://appsail-50023175614.development.catalystappsail.in";

  //edit

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            setTodos([...todos, { title, description }]);
            setTitle("");
            setDescription("");
            setMessage("Item Added Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            setError("Unable to Create Todo Item");
          }
        })
        .catch(() => {
          setError("Unable to create Todo Item");
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todo")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };
  
  const handleEdit = (item) =>{
    setEditId(item._id); 
    setEditTitle(item.title); 
    setEditDescription(item.description);

  }

  const handleUpdate = () =>{

    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/todo/"+ editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      })
        .then((res) => {
          if (res.ok) {
          const  updatedTodos =  todos.map((item)=>{
              if(item._id === editId){
                item.title = editTitle;
                item.description = editDescription;

              }
              return item;
            })
            setTodos( updatedTodos);
            setEditTitle("");
            setDescription("");
            setMessage("Item Updated Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000)

            setEditId(-1)
          } else {
            setError("Unable to Update Todo Item");
          }
        })
        .catch(() => {
          setError("Unable to Update Todo Item");
        });
    }

  }

  const handleEditCancel = () =>{
    setEditId(-1); 
  }


  const handleDelete = (id) => {
    if(window.confirm("Are You Sure Want to Delete")){
      fetch(apiUrl+'/todo/'+id,{
        method: "DELETE"
      })
      .then(()=>{
        const updatedTodos = todos.filter((item) => item._id !==id);
        setTodos(updatedTodos)
      })
    }

  }
  

  return (
    <>
      <div class="flex p-5  font-sans bg-navBg">
        <h1 class="text-fontPrimary text-lg font-bold">
          Todo App with MERN Stack
        </h1>
      </div>

      <div class="sm:p-5">
        <div class="">
          <h1 class="text-xl mt-5 mb-2 px-5  text-fontPrimary font-semibold">
            Add Item
          </h1>
          {message && <p class="text-lg text-green-500 px-5">{message}</p>}
        </div>

        <div class="grid sm:grid-cols-7 px-5  gap-4">
          <div class="col-span-3 self-center ">
            <input
              type="text"
              id="title"
              class="bg-inputBg  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div class="col-span-3">
            <textarea
              id="description"
              rows="3"
              class="block p-3 w-full text-sm text-white bg-inputBg rounded-lg  focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
          </div>
          <div class="col-span-1 sm:m-auto">
            <button
              type="button"
              class="py-2.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-btnBg rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        {error && <p class="text-red-600 text-lg mt-3 px-5">{error}</p>}

        <div class="">
          <h1 class="text-xl mt-1  px-5  text-fontPrimary font-semibold">
            Todo Items
          </h1>
        </div>

        <div class="grid sm:grid-cols-3 gap-3  p-5">
          {todos.map((item) => (
            <div class="bg-inputBg rounded-md p-5 sm:p-3">
              <div class="w-1/7 float-right ">
                {editId === -1 || editId !== item._id ? (
                  <button
                    type="button"
                    class="py-2 px-2 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-btnBg rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    onClick={()=>handleEdit(item)}
                  >
                    <FaEdit style={{ fontSize: "10px" }} />
                  </button>
                ) : (
                  <button
                    type="button"
                    class="py-2 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-btnBg rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                )} 

             {editId === -1 || editId !== item._id ? (
                <button
                  type="button"
                  class="py-2 px-2  me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-btnBg rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 " onClick={()=> handleDelete(item._id)}
                >
                  <FaTrash style={{ fontSize: "10px" }} />
                </button>
                  ) : (

                <button
                  type="button"
                  class="py-2 px-2  me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-btnBg rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  onClick={handleEditCancel}

                >
                Cancel
                </button>)}
              </div>

              {editId === -1 || editId !== item._id ? (
                <>
                  <h1 class="text-fontPrimary font-semibold text-lg mb-2 w-6/7 ">
                    {item.title}
                  </h1>

                  <p class="text-white clear-both">{item.description}</p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    id="title"
                    class="bg-inputBg  text-fontPrimary font-semibold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/7 p-2.5  "
                    placeholder="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  /> 

                  <textarea
                    id="description"
                    rows="3"
                    class="block p-3 w-full text-sm  clear-both text-white bg-inputBg rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                  ></textarea>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;

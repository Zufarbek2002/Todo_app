import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(2);
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(0)

  const getTodos = async () => {
    const res = await axios(
      `http://localhost:3000/todos?_page=${page}&_per_page=10`
    );
    const data = res.data;
    setDataList(data.data);
    setItems(data.items)
    console.log(items);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    getTodos();
  };
  const handleComplete = async (todo) => {
      await axios.put(`http://localhost:3000/todos/${todo.id}`, {
      id: `${todo.id}`,
      title: `${todo.title}`,
      completed: true,
    });

    getTodos();
  };

  const handleForm = async(e) => {
    e.preventDefault()
    inputValue && (await axios.post(`http://localhost:3000/todos`, {
      title: `${inputValue}`,
      completed: false,
    }))

    getTodos();
  }
  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    getTodos();
  }, [page]);
  return (
    <div className="container mt-4">
      <form className="form-control d-flex gap-5 mb-5 p-3">
        <input type="text" placeholder="Added task..." className="form-control" onChange={handleInput}/>
        <button type="submit" onClick={handleForm} className="btn btn-outline-success w-25">Add</button>
      </form>
      {dataList.map((data) => (
        <div key={data.id} className="card mb-4">
          <div className="card-body d-flex justify-content-between">
            <h2
              className={
                data.completed
                  ? "text-decoration-line-through fs-4"
                  : "text-decoration-line-none fs-4"
              }
            >
              {data.title}
            </h2>
            <p>{data.completed ? "✅" : "❌"}</p>
          </div>
          <div className="card-footer d-flex gap-3">
            <button
              onClick={() =>
                handleComplete({
                  id: `${data.id}`,
                  title: `${data.title}`,
                  completed: Boolean(`${data.completed}`),
                })
              }
              className="btn btn-success"
            >
              {
                data.completed ? 'Uncompleted' : 'Completed'
              }
            </button>
            <button onClick={() => handleDelete(data.id)} className="btn btn-danger">Delete</button>
            <button className="btn btn-primary">Edit</button>
          </div>
        </div>
      ))}
      <div className="btn_box d-flex justify-content-center gap-3 align-items-center">
        <button onClick={handlePrev} disabled={page == 1} className="btn btn-outline-dark">
          Prev
        </button>
        <h2>{page}</h2>
        <button onClick={handleNext} disabled={items <= page * 10} className="btn btn-outline-dark">
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

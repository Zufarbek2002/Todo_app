import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  // const [dataId, setDataId] = useState(0)
  const getTodos = async () => {
    const res = await axios(
      `http://localhost:3000/todos?_page=${page}&_per_page=10`
    );
    const data = res.data;
    setDataList(data.data);
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

  useEffect(() => {
    getTodos();
  }, [page]);
  return (
    <div className="container mt-4">
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
          <div className="card-footer">
            <button
              onClick={() =>
                handleComplete({
                  id: `${data.id}`,
                  title: `${data.title}`,
                  completed: Boolean(`${data.completed}`),
                })
              }
            >
              Complete
            </button>
            <button onClick={() => handleDelete(data.id)}>Delete</button>
            <button>Edit</button>
          </div>
        </div>
      ))}
      <div className="btn_box d-flex justify-content-center gap-3 align-items-center">
        <button onClick={handlePrev} disabled={page == 1}>
          Prev
        </button>
        <h2>{page}</h2>
        <button onClick={handleNext} disabled={page == 20}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

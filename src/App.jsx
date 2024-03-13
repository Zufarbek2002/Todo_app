import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1)
  const [dataId, setDataId] = useState(0)
  const getTodos = async () => {
    const data = await axios(`http://localhost:3000/todos?_page=${page}&_per_page=10`);
    // console.log(data.data.data);
    setDataList(data.data.data);
  };
  const handlePrev = () => {
    setPage(page-1)
  }
  const handleNext = () => {
    setPage(page+1)
  }
  const handleCheck = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    setDataId()
    dataList.map((data)=>{
      if (e.target.checked) {
        data.completed = true
      }

    })
  }

  useEffect(() => {
    getTodos();
  }, [page]);
  return (
    <div className="container mt-4">
      {dataList.map((data) => (
        <div key={data.id} className="card mb-4">
          <div className="card-body d-flex justify-content-between">
            {/* <input type="checkbox" name="check" id="check" onClick={handleCheck}/> */}
            <h2 className={data.completed ? 'text-decoration-underline' : 'fs-2'}>{data.title}</h2>
            <p>{data.completed ? "✅" : "❌"}</p>
          </div>
          <div className="card-footer">
            <button onClick={()=>handleCheck(data.id)}>Complete</button>
            <button onClick={()=>handleDelete(data.id)}>Delete</button>
            <button>Edit</button>
          </div>
        </div>
      ))}
      <div className="btn_box d-flex justify-content-center gap-3 align-items-center">
        <button onClick={handlePrev} disabled = {page == 1}>Prev</button>
        <h2>{page}</h2>
        <button onClick={handleNext} disabled = {page == 20}>Next</button>
      </div>
    </div>
  );
};

export default App;

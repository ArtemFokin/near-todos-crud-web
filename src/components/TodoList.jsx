import React, {useState, useEffect} from 'react';
import Todo from './Todo';

const PER_PAGE_LIMIT = 3;

const TodoList = ({ contract }) => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    let offset;
    if(page < 1){
      setPage(1);
      offset = 0;
    } else {
      offset = (page - 1) * PER_PAGE_LIMIT;
    }
    const id = setInterval(() => {
      contract
        .get({ offset, limit: PER_PAGE_LIMIT })
        .then((todos) => setTodos(todos));
    }, 1000);

    return () => clearInterval(id);
  }, [page, contract]);

  return (
    <ul>
      <div className="flex">
      Current Page: {page}
      </div>
      <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
      {" "}
      <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo contract={contract} {...todo} />
        </li>
      ))}
    </ul>
  )
};

export default TodoList;

import React, {useState} from 'react';

const CreateTodo = ({ contract }) => {
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const todo = await contract.create({ task });
    setTask("");
    setLoading(false);

    console.log('my todo', todo);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buy Groceries"
        value={task}
        onChange={({ target }) => setTask(target.value)}
      />
      <button disabled={loading}>Create Task</button>
    </form>
  );
};

export default CreateTodo;

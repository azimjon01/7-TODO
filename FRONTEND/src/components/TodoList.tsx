import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../api/todoApi";
import styled from "@emotion/styled";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const BigContainer = styled.div({
  width: "100vw",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const Container = styled.div((props) => ({
  height: "calc(100% - 40px)",
  width: "40vw",
  display: "grid",
  placeItems: "center",
  background: props.theme.colors.background,
  borderRadius: 50,
  overflowY: "hidden",
}));

const Wrapper = styled.div((props) => ({
  width: "calc(100% - 40px)",
  height: "calc(100% - 40px)",
  backgroundColor: props.theme.colors.text,
  borderRadius: 40,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  gap: 15,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Title = styled.h1((props) => ({
  color: props.theme.colors.background,
}));

const Button = styled.button({
  padding: 10,
});

type TodoListProps = {
  toggleTheme: () => void;
};

const TodoList = ({ toggleTheme }: TodoListProps) => {
  const [todos, setTodos] = useState<
    {
      id: number;
      text: string;
      completed: boolean;
    }[]
  >([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async (text: string) => {
    const res = await addTodo(text);
    setTodos([...todos, res.data]);
  };

  const handleUpdate = async (
    id: number,
    updateData: { completed?: boolean; text?: string },
  ) => {
    const res = await updateTodo(id, updateData);
    setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const res = await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? res.data : t)));
    }
  };

  return (
    <BigContainer>
      <Container>
        <Wrapper>
          <Title>Vazifalar ro'yxati</Title>
          <Button onClick={toggleTheme}>dark</Button>
          <AddTodo onAdd={handleAdd} />
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => handleDelete(todo.id)}
              onUpdate={(updateData) => handleUpdate(todo.id, updateData)}
              onToggle={() => handleToggle(todo.id)}
            />
          ))}
        </Wrapper>
      </Container>
    </BigContainer>
  );
};

export default TodoList;

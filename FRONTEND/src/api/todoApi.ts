import axios from "axios";

const API_URL = "http://localhost:3000/api/todos";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createAt: string;
}

export interface CreateTodoDto {
  text: string;
}

export interface UpdateTodoDto {
  completed?: boolean;
  text?: string;
}

export const getTodos = () => axios.get<Todo[]>(API_URL);

export const addTodo = (text: string) => axios.post<Todo>(API_URL, { text });

export const deleteTodo = (id: number) =>
  axios.delete<void>(`${API_URL}/${id}`);

export const updateTodo = (id: number, data: UpdateTodoDto) =>
  axios.put<Todo>(`${API_URL}/${id}`, data);

import styled from "@emotion/styled";
import React, { useState } from "react";

const Form = styled.form({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
});

const Input = styled.input((props) => ({
  flex: 1,
  padding: 8,
  fontSize: props.theme.sizes.size,
}));

const Button = styled.button((props) => ({
  fontSize: props.theme.sizes.size,
  padding: "10px 20px",
  cursor: "pointer",
  "&:hover": {
    background: props.theme.colors.secondary,
  },
}));

interface Props {
  onAdd: (text: string) => void;
}

const AddTodo = ({ onAdd }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        autoFocus
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yangi vazifani yozing..."
      />
      <Button type="submit">Qo'shish</Button>
    </Form>
  );
};

export default AddTodo;

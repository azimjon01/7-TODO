import styled from "@emotion/styled";
import { FC, useState } from "react";

const Item = styled.div({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
  borderBottom: "1px solid #ddd",
});

const Text = styled.span<{ completed: boolean }>(({ completed, theme }) => ({
  flex: 1,
  backgroundColor: completed ? theme.colors.secondary : theme.colors.text,
  textDecoration: completed ? "line-through" : "none",
  color: completed ? theme.colors.text : theme.colors.background,
  cursor: "pointer",
  textTransform: "uppercase",
  padding: "10px 20px",
  borderRadius: 10,
}));

const Input = styled.input({
  flex: 1,
  padding: 10,
  borderRadius: 10,
  fontSize: 16,
});

const Update = styled.button({
  padding: 10,
  cursor: "pointer",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: "lightblue",
  },
});

const Button = styled.button((props) => ({
  padding: 10,
  cursor: "pointer",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: props.theme.colors.primary,
  },
}));

interface Props {
  todo: { id: number; text: string; completed: boolean };
  onUpdate: (data: { text?: string; completed?: boolean }) => void;
  onDelete: () => void;
  onToggle: () => void;
}

const TodoItem: FC<Props> = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editText.trim()) {
      onUpdate({ text: editText.trim() });
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <Item>
      {isEditing ? (
        <Input
          value={editText}
          autoFocus
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Text completed={todo.completed} onClick={onToggle}>
          {todo.text}
        </Text>
      )}
      <Update onClick={() => setIsEditing(true)}>Tahrirlash</Update>
      <Button onClick={onDelete}>O'chirish</Button>
    </Item>
  );
};

export default TodoItem;

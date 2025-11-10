import { Box } from "@mui/material";
import TodoCard from "./TodoCard";

type Props = {
    todos: ToDo[];
    selectTodo: (id: string) => void

}

export default function TodoList({ todos,selectTodo }: Props) {
  return (
    <Box sx={{display:'flex', flexDirection:'column',gap:3}}>
        {todos.map(todo => (
            <TodoCard
            key={todo.id}
            todo={todo}
            selectTodo={selectTodo}
            />
        ))}

    </Box>
  )
}

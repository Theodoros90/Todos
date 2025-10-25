import { useEffect, useState } from "react";
import { Navbar } from "./assets/Componets/Layout/Navbar";
import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);

useEffect(() => {
  axios.get<ToDo[]>("https://localhost:5001/api/todos")
   
    .then(response => setTodos(response.data))
    return () => {}
}, []);

  return (
    <>
      <Navbar />
      
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText>{todo.description}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;

import { Box, Container, CssBaseline, Typography, } from "@mui/material";
import { useState } from "react";
import TodoDashboard from "../../features/todos/dashboard/TodoDashboard";
import { useTodos } from "../../lib/hooks/useTodos";
import NavBar from "./NavBar";


function App() {
  const [selectedTodo, setSelectedTodo] = useState<ToDo | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
const {todos, isPending} = useTodos();



const handleSelectTodo = (id: string) => {
  setSelectedTodo(todos!.find(x => x.id === id));
}

const handleCancelSelectTodo = () => {
  setSelectedTodo(undefined);
}

const handleOpenForm = (id?: string) => {
  if(id) handleSelectTodo(id);
  else handleCancelSelectTodo();
  setEditMode(true);
}
const handleCloseForm = () => {
  setEditMode(false);
}

  return (

    <Box sx={{bgcolor:'#eeee'}}>
  <CssBaseline />
      <NavBar
        openForm={handleOpenForm}

      />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!todos || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
<TodoDashboard
todos={todos}
selectTodo={handleSelectTodo}
cancelSelectTodo={handleCancelSelectTodo}
selectedTodo={selectedTodo}
editMode={editMode}
openForm={handleOpenForm}
closeForm={handleCloseForm}
 />
        ) }

      </Container>

    </Box>
  );
}

export default App;

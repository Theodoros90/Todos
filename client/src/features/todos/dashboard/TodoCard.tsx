import {
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useTodos } from "../../../lib/hooks/useTodos";

type Props = {
  todo: ToDo;
  selectTodo: (id: string) => void;
};

const getStatusChipStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return { label: "Completed", color: "success", variant: "filled" };
    case "In Progress":
      return { label: "In Progress", color: "info", variant: "filled" };
    case "Pending":
      return { label: "Pending", color: "warning", variant: "filled" };
    case "On Hold":
      return { label: "On Hold", color: "default", variant: "filled" };
    case "Cancelled":
      return { label: "Cancelled", color: "error", variant: "outlined" };
    default:
      return { label: status, color: "default", variant: "filled" };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    default:
      return "default";
  }
};

export default function TodoCard({ todo, selectTodo }: Props) {
  const {deleteTodo} = useTodos();
  const statusChip = getStatusChipStyle(todo.status);
  const priorityColor = getPriorityColor(todo.pariority);

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack spacing={2}>
        {/* Title */}
        <Typography variant="h6" fontWeight={700} color="text.primary">
          {todo.title}
        </Typography>

        {/* Due Date */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
            }}
          >
            Due: {todo.dueDate}
          </Typography>
        </Box>

        {/* Chips and Actions */}
        <CardActions
          sx={{
            px: 0,
            pt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: 1,
          }}
        >
          <Stack direction="row" spacing={1}>
            {/* Status Chip */}
            <Chip
              label={statusChip.label}
              color={statusChip.color as "default" | "primary" | "success" | "info" | "warning" | "error"}
              variant={statusChip.variant as "filled" | "outlined"}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                borderRadius: "999px",
                px: 1.5,
                height: 28,
              }}
            />

            {/* Priority Chip */}
            <Chip
              label={`Priority: ${todo.pariority}`}
              color={priorityColor as "default" | "error" | "warning"}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                borderRadius: "999px",
                px: 1.5,
                height: 28,
              }}
            />
          </Stack>

          {/* Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                fontSize: "0.8rem",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              onClick={() => deleteTodo.mutate(todo.id)}
              disabled={deleteTodo.isPending}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                fontSize: "0.8rem",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
              onClick={() => selectTodo(todo.id)}
            >
              View Details
            </Button>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import {  Checklist } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {

  return (
   
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
          <Toolbar>

            {/* App Icon + Title */}
            <Checklist sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontFamily: "Roboto",
                display: "flex",
                alignItems: "center",
              }}
            >
              Swift List
            </Typography>

            {/* Navigation Links */}
<Button color="inherit" sx={{ mx: 1 }}>All Tasks</Button>
<Button color="inherit" sx={{ mx: 1 }}>My Tasks</Button>
<Button
  variant="contained"
  size="medium"
  startIcon={<AddCircleOutlineIcon />}
  onClick={openForm}
  sx={{
    mx: 1,
    fontWeight: "bold",
    borderRadius: "12px",
    textTransform: "none",
    px: 3,
    py: 1.4,
    background: "linear-gradient(45deg, #FFA726 30%, #FB8C00 90%)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    '&:hover': {
      background: "linear-gradient(45deg, #FB8C00 30%, #EF6C00 90%)",
      boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
      transform: "translateY(-2px)",
    }
  }}
>
  Create Task
</Button>

          </Toolbar>
        </AppBar>
      </Box>
  );
}

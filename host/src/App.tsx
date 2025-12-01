import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import RemoteComponentLoader from "./components/RemoteComponentLoader";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Host Application
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This demonstrates MUI theming with Module Federation
          </Typography>

          {/* Show theme colors */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Theme Preview
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button variant="contained" color="primary">
                Primary
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="text" color="primary">
                Text
              </Button>
            </Stack>
          </Paper>

          {/* Remote component */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Remote Component (inherits theme):
            </Typography>
            <RemoteComponentLoader
              // @ts-expect-error - Remote module from Module Federation
              loader={() => import("remoteApp/Button")}
              moduleName="Remote Button"
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

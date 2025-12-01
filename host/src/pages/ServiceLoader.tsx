import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import RemoteComponentLoader from "../components/RemoteComponentLoader";

function ServiceLoader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Map service IDs to their loaders and metadata
  const serviceMap = {
    send: {
      title: "Send Money",
      app: "remoteApp",
      // @ts-expect-error
      loader: () => import("remoteApp/Send"),
    },
    receive: {
      title: "Receive Money",
      app: "remoteApp",
      // @ts-expect-error
      loader: () => import("remoteApp/Receive"),
    },
    "new-pawn": {
      title: "New Pawn",
      app: "remoteApp1",
      // @ts-expect-error
      loader: () => import("remoteApp1/NewPawn"),
    },
  };

  const service = id ? serviceMap[id as keyof typeof serviceMap] : null;

  if (!service) {
    return (
      <Box>
        <Typography variant="h4" color="error">
          Service not found
        </Typography>
        <Button onClick={() => navigate("/services")} sx={{ mt: 2 }}>
          ← Back to Services
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button onClick={() => navigate("/services")} sx={{ mb: 3 }}>
        ← Back to Services
      </Button>

      <RemoteComponentLoader
        loader={service.loader}
        moduleName={`${service.title} (${service.app})`}
        loadingMessage={`Loading ${service.title}...`}
      />
    </Box>
  );
}

export default ServiceLoader;

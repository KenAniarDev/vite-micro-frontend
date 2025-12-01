import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
} from "@mui/material";

function Services() {
  const services = [
    {
      id: "send",
      title: "Send",
      description: "Send money to family and friends quickly and securely",
      icon: "📤",
      color: "#1976d2",
    },
    {
      id: "receive",
      title: "Receive",
      description: "Receive money from anywhere in the world",
      icon: "📥",
      color: "#2e7d32",
    },
    {
      id: "new-pawn",
      title: "New Pawn",
      description: "Start a new pawn transaction with ease",
      icon: "💎",
      color: "#ed6c02",
    },
  ];

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Our Services
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Choose from our range of financial services
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    backgroundColor: service.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    fontSize: "2rem",
                  }}
                >
                  {service.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="medium"
                  variant="contained"
                  component={Link}
                  to={`/services/${service.id}`}
                  fullWidth
                  sx={{ backgroundColor: service.color }}
                >
                  Get Started →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Services;

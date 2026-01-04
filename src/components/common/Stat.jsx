import { Box, Typography } from "@mui/material";

export const Stat = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="h6">{value}</Typography>
  </Box>
);

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityDetails } from "../services/api";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const data = await getActivityDetails(id);

        console.log("Activity details", data);

        setActivity(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>
          Loading recommendation...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 3,
      }}
    >
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          mb: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4">
            Activity Recommendation
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, mb: 2 }}
          >
            <Chip
              color="primary"
              label={activity.activityType}
            />
          </Stack>

          <Typography color="text.secondary">
            {new Date(activity.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
          >
            AI Analysis
          </Typography>

          <Typography paragraph>
            {activity.recommendation}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            gutterBottom
          >
            Improvements
          </Typography>

          {activity.improvements?.map(
            (improvement, index) => (
              <Typography key={index}>
                • {improvement}
              </Typography>
            )
          )}

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            gutterBottom
          >
            Suggestions
          </Typography>

          {activity.suggestions?.map(
            (suggestion, index) => (
              <Typography key={index}>
                • {suggestion}
              </Typography>
            )
          )}

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            gutterBottom
          >
            Safety Guidelines
          </Typography>

          {activity.safety?.map(
            (safety, index) => (
              <Typography key={index}>
                • {safety}
              </Typography>
            )
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetail;
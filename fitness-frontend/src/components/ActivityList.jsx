import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";

const ActivityList = ({ refreshKey }) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const data = await getActivities();

      console.log("Activities fetched:", data);

      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [refreshKey]);

  if (!activities.length) {
    return (
      <Typography textalign="center">
        No activities found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {activities.map((activity) => (
        <Grid
          xs={12}
          sm={6}
          md={4}
          key={activity.id}
        >
          <Card
            elevation={5}
            onClick={() =>
              navigate(`/activity/${activity.id}`)
            }
            sx={{
              cursor: "pointer",
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
              },
            }}
          >
            <CardContent>
              <Box mb={2}>
                <Chip
                  label={activity.type}
                  color="primary"
                />
              </Box>

              <Typography variant="h6">
                {activity.type}
              </Typography>

              <Typography color="text.secondary">
                Duration: {activity.duration} min
              </Typography>

              <Typography color="text.secondary">
                Calories: {activity.caloriesBurned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
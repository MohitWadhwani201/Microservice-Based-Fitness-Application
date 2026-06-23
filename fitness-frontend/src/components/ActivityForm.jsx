import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import { addActivity } from "../services/api";

const ActivityForm = ({ onActivitiesAdded }) => {
  const [activity, setActivity] = useState({
    type: "",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addActivity(activity);

      onActivitiesAdded?.();

      setActivity({
        type: "",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Track Activity
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Activity Type</InputLabel>

          <Select
            value={activity.type}
            label="Activity Type"
            onChange={(e) =>
              setActivity({
                ...activity,
                type: e.target.value,
              })
            }
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            <MenuItem value="SWIMMING">Swimming</MenuItem>
            <MenuItem value="WEIGHT_TRAINING">
              Weight Training
            </MenuItem>
            <MenuItem value="YOGA">Yoga</MenuItem>
            <MenuItem value="CARDIO">Cardio</MenuItem>
            <MenuItem value="STRETCHING">
              Stretching
            </MenuItem>
            <MenuItem value="OTHERS">Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Duration (minutes)"
          type="number"
          fullWidth
          value={activity.duration}
          onChange={(e) =>
            setActivity({
              ...activity,
              duration: e.target.value,
            })
          }
        />

        <TextField
          label="Calories Burned"
          type="number"
          fullWidth
          value={activity.caloriesBurned}
          onChange={(e) =>
            setActivity({
              ...activity,
              caloriesBurned: e.target.value,
            })
          }
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 1,
            borderRadius: 3,
          }}
        >
          Add Activity
        </Button>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
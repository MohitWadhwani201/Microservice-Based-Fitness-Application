import { useContext, useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Avatar, Stack } from "@mui/material";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";

import { setCredentials, logout } from "./store/authSlice";

import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import ActivityForm from "./components/ActivityForm";

function ActivitiesPage() {
	const [refreshKey, setRefreshKey] = useState(0);

	return (
		<Box
			sx={{
				maxWidth: "1200px",
				mx: "auto",
				p: 3,
			}}
		>
			<ActivityForm onActivitiesAdded={() => setRefreshKey((prev) => prev + 1)} />

			<ActivityList refreshKey={refreshKey} />
		</Box>
	);
}

function App() {
	const { token, tokenData, logIn, logOut } = useContext(AuthContext);

	const dispatch = useDispatch();

	useEffect(() => {
		if (token && tokenData) {
			dispatch(
				setCredentials({
					token,
					user: tokenData,
				}),
			);
		}
	}, [token, tokenData, dispatch]);

	return (
		<Router>
			{!token ? (
				<Box
					sx={{
						minHeight: "100vh",
						display: "flex",
						justifycontent: "center",
						alignitems: "center",
						background: "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
					}}
				>
					<Paper
						elevation={8}
						sx={{
							p: 5,
							borderRadius: 5,
							textalign: "center",
							width: 400,
						}}
					>
						<Typography
							variant="h4"
							gutterBottom
							sx={{
								fontWeight: 700,
							}}
						>
							Fitness Tracker
						</Typography>

						<Typography color="text.secondary" sx={{ mb: 4 }}>
							Track activities and get AI-powered fitness recommendations.
						</Typography>

						<Button
							variant="contained"
							size="large"
							fullWidth
							onClick={() => logIn()}
							sx={{
								py: 1.5,
								borderRadius: 3,
								fontWeight: 600,
							}}
						>
							Login with Keycloak
						</Button>
					</Paper>
				</Box>
			) : (
				<Box
					sx={{
						minHeight: "100vh",
						backgroundColor: "#f8fafc",
					}}
				>
					{/* Header */}
					<Box
						sx={{
							background: "linear-gradient(135deg,#2563eb,#7c3aed)",
							color: "white",
							px: 4,
							py: 2.5,
							boxShadow: 3,
						}}
					>
						<Stack direction="row" justifycontent="space-between" alignitems="center">
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									letterSpacing: 1,
								}}
							>
								Fitness AI Dashboard
							</Typography>

							<Stack direction="row" spacing={2} alignitems="center">
								<Avatar
									sx={{
										bgcolor: "white",
										color: "#2563eb",
										fontWeight: 700,
									}}
								>
									{tokenData?.given_name?.charAt(0) || "U"}
								</Avatar>

								<Box>
									<Typography fontWeight={600}>
										{tokenData?.given_name} {tokenData?.family_name}
									</Typography>

									<Typography
										variant="body2"
										sx={{
											opacity: 0.8,
										}}
									>
										{tokenData?.email}
									</Typography>
								</Box>

								<button
									onClick={() => {
										dispatch(logout()); // clear redux state
										logOut(); // logout from Keycloak
									}}
									style={{
										backgroundColor: "#ef4444",
										color: "white",
										border: "none",
										padding: "10px 20px",
										borderRadius: "12px",
										cursor: "pointer",
										fontSize: "14px",
										fontWeight: "600",
										transition: "all 0.3s ease",
										boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
									}}
								>
									Logout
								</button>
							</Stack>
						</Stack>
					</Box>

					{/* Routes */}
					<Routes>
						<Route path="/activities" element={<ActivitiesPage />} />

						<Route path="/activity/:id" element={<ActivityDetail />} />

						<Route path="*" element={<Navigate to="/activities" replace />} />
					</Routes>
				</Box>
			)}
		</Router>
	);
}

export default App;

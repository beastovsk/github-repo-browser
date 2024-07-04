// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import Repository from "./features/repository/Repository";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/repository/:owner/:name"
					element={<Repository />}
				/>
			</Routes>
		</Router>
	);
};

export default App;

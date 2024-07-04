import React from "react";
import "../features/repository/Repository.css";

const ErrorWidget: React.FC = () => {
	return (
		<div className="error-container">
			<img
				src="/path/to/error-image.png"
				alt="Error"
				className="error-image"
			/>
			<p className="error-message">Error loading repository</p>
		</div>
	);
};

export default ErrorWidget;

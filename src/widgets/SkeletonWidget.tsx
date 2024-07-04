import React from "react";
import "../features/repository/Repository.css";

const SkeletonWidget: React.FC = () => {
	return (
		<div className="skeleton-container">
			<div className="skeleton-title"></div>
			<div className="skeleton-owner-info">
				<div className="skeleton-avatar"></div>
				<div className="skeleton-owner-link"></div>
			</div>
			<ul className="skeleton-language-list">
				<li className="skeleton-language-item"></li>
				<li className="skeleton-language-item"></li>
				<li className="skeleton-language-item"></li>
			</ul>
			<p className="skeleton-description"></p>
		</div>
	);
};

export default SkeletonWidget;

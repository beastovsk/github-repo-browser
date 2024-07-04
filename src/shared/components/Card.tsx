import React from "react";
import { Repository } from "../../entities/repository/Repository";
import "./Card.css"; // Подключаем файл стилей для компонента Card

interface CardProps {
	repo: Repository;
}

const Card: React.FC<CardProps> = ({ repo }) => {
	return (
		<div className="repository-card">
			<div className="repository-header">
				<h2 className="repository-name">
					{repo.name} - {repo.stargazerCount} stars - Last updated{" "}
					{new Date(repo.updatedAt).toLocaleDateString()}
				</h2>
			</div>
			<div className="owner-info">
				{repo.owner.avatarUrl && (
					<img
						src={repo.owner.avatarUrl}
						alt={repo.owner.login}
						className="owner-avatar"
					/>
				)}
				<a href={repo.owner.url} className="owner-link">
					{repo.owner.login}
				</a>
			</div>
			<ul className="language-list">
				{repo.languages.nodes.map(({ name }, i) => (
					<li key={i} className="language-item">
						{name}
					</li>
				))}
			</ul>
			<p className="repository-description">{repo.description}</p>
		</div>
	);
};

export default Card;

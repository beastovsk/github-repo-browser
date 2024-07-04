import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import "./Home.css";
import Pagination from "../../widgets/Pagination";
import { Repository } from "../../entities/repository/Repository";
import { useRepoStore } from "../../shared/store/useRepoStore";

const GET_REPOSITORIES = gql`
	query GetRepositories($query: String!, $first: Int!, $after: String) {
		search(query: $query, type: REPOSITORY, first: $first, after: $after) {
			repositoryCount
			edges {
				node {
					... on Repository {
						name
						owner {
							login
							avatarUrl
							url
						}
						stargazerCount
						updatedAt
						languages(first: 10) {
							nodes {
								name
							}
						}
						description
					}
				}
				cursor
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;
const Home: React.FC = () => {
	const { searchQuery, currentPage, setCurrentPage, setSearchQuery } =
		useRepoStore();
	const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
		variables: { query: searchQuery, first: 10, after: null },
	});

	useEffect(() => {
		// TODO - возвращает одинаковые курсоры
		// Пагинация не работает

		// В GraphQL API GitHub не поддерживает параметр page для запроса search.
		// Вместо этого, нужно использовать параметры first и after для пагинации через курсоры, которые тоже не работают.

		if (currentPage > 1 && data?.search.pageInfo.hasNextPage) {
			fetchMore({
				variables: {
					query: searchQuery,
					first: 10,
					after: data.search.pageInfo.endCursor,
				},
			});
		}
	}, [currentPage, fetchMore, data, searchQuery]);

	const renderSkeleton = () => (
		<ul className="repo-list">
			{[...Array(10)].map((_, index) => (
				<li key={index} className="repo-item skeleton">
					<div className="skeleton-title"></div>
					<div className="skeleton-details"></div>
				</li>
			))}
		</ul>
	);

	const renderError = () => (
		<div className="error-container">
			<img
				src="/assets/error-image.png"
				alt="Error"
				className="error-image"
			/>
			<p className="error-message">Error loading repositories</p>
		</div>
	);

	return (
		<div className="container">
			<h1 className="title">GitHub Repository Browser</h1>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search repositories..."
				className="search-input"
			/>
			{loading ? (
				renderSkeleton()
			) : error ? (
				renderError()
			) : (
				<ul className="repo-list">
					{data?.search.edges.map(
						({ node }: { node: Repository }) => (
							<li key={node.url} className="repo-item">
								<Link
									to={`/repository/${node.owner.login}/${node.name}`}
									className="repo-link"
								>
									{node.name}
								</Link>{" "}
								- {node.stargazerCount} stars - Last updated{" "}
								{new Date(node.updatedAt).toLocaleDateString()}{" "}
								-{" "}
								<a href={node.url} className="github-link">
									GitHub
								</a>
							</li>
						)
					)}
				</ul>
			)}
			<Pagination
				currentPage={currentPage}
				totalPages={10} // Assuming a total of 10 pages for this example
				onPageChange={(page) => {
					setCurrentPage(page);
				}}
			/>
		</div>
	);
};

export default Home;

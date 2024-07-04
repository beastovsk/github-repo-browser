import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./Repository.css";
import Card from "../../shared/components/Card";
import SkeletonWidget from "../../widgets/SkeletonWidget";
import ErrorWidget from "../../widgets/ErrorWidget";

const GET_REPOSITORY = gql`
	query GetRepository($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			name
			stargazerCount
			updatedAt
			owner {
				login
				avatarUrl
				url
			}
			languages(first: 10) {
				nodes {
					name
				}
			}
			description
		}
	}
`;

const Repository: React.FC = () => {
	const { owner, name } = useParams<{ owner: string; name: string }>();
	const { data, loading, error } = useQuery(GET_REPOSITORY, {
		variables: { owner, name },
	});

	const repo = data?.repository;

	return (
		<div className="repository-container">
			{loading ? <SkeletonWidget /> : null}
			{error ? <ErrorWidget /> : null}
			{repo && <Card repo={repo} />}
		</div>
	);
};

export default Repository;

export interface Repository {
	name: string;
	stargazerCount: number;
	updatedAt: string;
	owner: {
		login: string;
		avatarUrl: string;
		url: string;
	};
	languages: {
		nodes: {
			name: string;
		}[];
	};
	description: string;
	url: string;
}

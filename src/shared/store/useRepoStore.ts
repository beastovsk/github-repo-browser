import { create } from "zustand";

interface RepoState {
	searchQuery: string;
	currentPage: number;
	setSearchQuery: (query: string) => void;
	setCurrentPage: (page: number) => void;
}

export const useRepoStore = create<RepoState>((set) => ({
	searchQuery: "",
	currentPage: 1,
	setSearchQuery: (query) => set({ searchQuery: query }),
	setCurrentPage: (page) => set({ currentPage: page }),
}));

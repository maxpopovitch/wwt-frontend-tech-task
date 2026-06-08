import { create } from 'zustand'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	appliedFilters: SearchRequestFilter
	setAppliedFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>(set => ({
	appliedFilters: [],
	setAppliedFilters: filters => set({ appliedFilters: filters })
}))

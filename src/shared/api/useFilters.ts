import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

const fetchFilters = async (): Promise<FilterItem[]> => {
	return filterData.filterItems as unknown as FilterItem[]
}

export const useFilters = () => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: fetchFilters
	})
}

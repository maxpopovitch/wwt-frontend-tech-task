import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/shared/store/filterStore'
import { FilterModal } from '@/shared/ui/FilterModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const { appliedFilters } = useFilterStore()

	return (
		<section className="min-h-dvh w-full p-8">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="mb-8 text-6xl font-bold text-gray-800">
				WinWinTravel frontend test task
			</h1>

			<button
				onClick={() => setIsFilterModalOpen(true)}
				className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
				type="button"
			>
				{t('openFilters')}
			</button>

			<div className="mt-8">
				<p className="mb-2 text-sm font-semibold text-gray-700">
					{t('currentFilters')}
				</p>
				<pre className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
					{JSON.stringify(appliedFilters, null, 2)}
				</pre>
			</div>

			<FilterModal
				isOpen={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
			/>
		</section>
	)
}

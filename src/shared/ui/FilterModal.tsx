import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFilters } from '@/shared/api/useFilters'
import { useFilterStore } from '@/shared/store/filterStore'

import { ConfirmDialog } from './ConfirmDialog'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
}

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { data: filters, isLoading } = useFilters()
	const { appliedFilters, setAppliedFilters } = useFilterStore()

	const [draftFilters, setDraftFilters] = useState<SearchRequestFilter>([])
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setDraftFilters(appliedFilters)
		}
	}, [isOpen, appliedFilters])

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, onClose])

	const isOptionSelected = (filterId: string, optionId: string): boolean => {
		const found = draftFilters.find(item => item.id === filterId)

		return found?.optionsIds.includes(optionId) ?? false
	}

	const toggleOption = (filterId: string, optionId: string) => {
		setDraftFilters(prev => {
			const existing = prev.find(item => item.id === filterId)

			if (existing) {
				const hasOption = existing.optionsIds.includes(optionId)

				if (hasOption) {
					const newIds = existing.optionsIds.filter(id => id !== optionId)

					if (newIds.length === 0) {
						return prev.filter(item => item.id !== filterId)
					}

					return prev.map(item =>
						item.id === filterId ? { ...item, optionsIds: newIds } : item
					)
				}

				return prev.map(item =>
					item.id === filterId
						? { ...item, optionsIds: [...item.optionsIds, optionId] }
						: item
				)
			}

			return [
				...prev,
				{ id: filterId, type: FilterType.OPTION, optionsIds: [optionId] }
			]
		})
	}

	const handleApply = () => {
		setIsConfirmOpen(true)
	}

	const handleConfirm = () => {
		setAppliedFilters(draftFilters)
		setIsConfirmOpen(false)
		onClose()
	}

	const handleCancelConfirm = () => {
		setIsConfirmOpen(false)
	}

	if (!isOpen) {
		return null
	}

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div
					className="absolute inset-0 bg-black/40"
					onClick={onClose}
				/>
				<div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl">
					<div className="relative flex items-center justify-center border-b border-gray-100 px-10 py-4">
						<h2 className="text-base font-semibold text-gray-900">
							{t('title')}
						</h2>
						<button
							onClick={onClose}
							className="absolute right-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
							type="button"
						>
							<svg
								fill="none"
								height="12"
								viewBox="0 0 12 12"
								width="12"
							>
								<path
									d="M1 1L11 11M11 1L1 11"
									stroke="currentColor"
									strokeLinecap="round"
									strokeWidth="1.5"
								/>
							</svg>
						</button>
					</div>

					<div className="flex-1 overflow-y-auto px-6 py-5">
						{isLoading ? (
							<p className="text-sm text-gray-500">{t('loading')}</p>
						) : (
							<div className="pb-10">
								{filters?.map((filter, index) => (
									<div key={filter.id}>
										{index > 0 && <hr className="my-5 border-gray-100" />}
										<h3 className="mb-3 text-sm font-semibold text-gray-900">
											{filter.name}
										</h3>
										<div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
											{filter.options.map(option => (
												<label
													key={option.id}
													className="flex cursor-pointer gap-2"
												>
													<input
														checked={isOptionSelected(filter.id, option.id)}
														className="size-4 cursor-pointer accent-orange-500 mt-0.5"
														onChange={() => toggleOption(filter.id, option.id)}
														type="checkbox"
													/>
													<span className="text-sm text-gray-700">
														{option.name}
													</span>
												</label>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="relative flex justify-center border-t border-gray-100 px-6 py-4">
						<div className="pointer-events-none absolute -top-18 left-0 right-0 h-18 bg-gradient-to-t from-white to-transparent" />
						<button
							onClick={handleApply}
							className="rounded-full bg-orange-500 px-10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
							type="button"
						>
							{t('apply')}
						</button>
					</div>
				</div>
			</div>

			{isConfirmOpen && (
				<ConfirmDialog
					onCancel={handleCancelConfirm}
					onConfirm={handleConfirm}
				/>
			)}
		</>
	)
}

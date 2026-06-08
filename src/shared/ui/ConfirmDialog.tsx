import { useTranslation } from 'react-i18next'

interface ConfirmDialogProps {
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmDialog = ({ onConfirm, onCancel }: ConfirmDialogProps) => {
	const { t } = useTranslation('filter')

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/20"
				onClick={onCancel}
			/>
			<div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
				<button
					onClick={onCancel}
					className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
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
				<p className="mb-6 pr-6 text-sm font-medium text-gray-900">
					{t('confirm.description')}
				</p>
				<div className="flex items-center gap-3">
					<button
						onClick={onCancel}
						className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						type="button"
					>
						{t('confirm.cancel')}
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
						type="button"
					>
						{t('confirm.confirm')}
					</button>
				</div>
			</div>
		</div>
	)
}

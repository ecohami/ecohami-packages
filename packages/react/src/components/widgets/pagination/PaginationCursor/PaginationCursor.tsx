// External
import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

// Local
import { PageInfo, PaginationCursorArgs } from '../../../../types'

export type PaginationTakeOption = 5 | 10 | 25 | 50 | 100
export const PAGINATION_OPTIONS: PaginationTakeOption[] = [5, 10, 25, 50, 100]

type PaginationCursorProps = {
  pagination: PaginationCursorArgs
  pageInfo: PageInfo
  total: number
  rewriteUrl?: boolean
  handlePrevious: () => void
  handleNext: () => void
}

export const PaginationCursor: React.FC<PaginationCursorProps> = ({
  pagination,
  pageInfo,
  total,
  rewriteUrl = true,
  handlePrevious,
  handleNext,
}) => {
  const { t } = useTranslation()

  const handleChangeItems = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const take = parseInt(event.target.value)

    if (typeof window !== 'undefined' && rewriteUrl) {
      const url = new URL(window.location.href)
      url.searchParams.set('take', take.toString())
      window.history.replaceState({}, '', url.toString())
    }
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="capitalize">
        {t('pagination.total')}: {total}
      </div>
      <div className="join grid grid-cols-2">
        <button
          className="btn btn-outline w-36 join-item"
          onClick={handlePrevious}
          disabled={!pageInfo.hasPreviousPage}
        >
          <MdArrowBackIos />
          <span>{t('pagination.previous')}</span>
        </button>
        <button
          className="btn btn-outline w-36 join-item"
          onClick={handleNext}
          disabled={!pageInfo.hasNextPage}
        >
          <span>{t('pagination.next')}</span>
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="flex text-sm">
        <select
          className="select select-bordered"
          onChange={handleChangeItems}
          value={pagination.take}
        >
          {PAGINATION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} {t('pagination.perPage')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

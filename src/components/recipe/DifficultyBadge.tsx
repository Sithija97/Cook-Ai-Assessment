import { memo } from 'react'
import { DIFFICULTY_COLORS, type Difficulty } from '../../utils/constants'

interface Props {
  difficulty: Difficulty
  className?: string
}

export const DifficultyBadge = memo(function DifficultyBadge({ difficulty, className = '' }: Props) {
  const colors = DIFFICULTY_COLORS[difficulty] ?? DIFFICULTY_COLORS.Easy

  return (
    <span className={[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border',
      colors.bg, colors.text, colors.border,
      className,
    ].join(' ')}>
      {difficulty}
    </span>
  )
})

import React from 'react'
import { Crown } from 'lucide-react'

export const Logo = () => {
  return (
		<div className="flex items-center gap-1 text-xl font-bold ">
			<Crown className="text-[var(--color-primary)]" />
			<span className="text-gray-100">RoyalRetreats</span>
		</div>
	);
}

import React from 'react'

const COLORS= {
     low: '#4C9EEB',
  medium: '#FFB020',
  high: '#E88A2B',
  critical: '#E5484D',
};

export default function SeverityBadge({severity}){
  const color=COLORS[severity] || '#8A94A6';

  return(
    <span className={`color border border:${color}55 bg:${color}18 p-2 rounded-sm font-bold `}>{severity}</span>
  )
}
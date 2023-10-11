'use client'

import { Carrot, Salad, Lock, Unlock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface MealItemProps {
  index: number
  itemName: string
  itemType: 'dish' | 'vegetable'
  locked: boolean
  toggleLock: (itemType: 'dish' | 'vegetable', index: number) => void
}

export default function MealItem({
  index,
  itemName,
  itemType,
  locked,
  toggleLock,
}: MealItemProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 text-slate-400">
        <CardTitle className="text-sm font-medium">{itemType}</CardTitle>
        {itemType === 'dish' ? <Salad /> : <Carrot />}
      </CardHeader>
      <CardContent className="flex justify-between pt-1 text-lg font-bold text-slate-800">
        <div className="flex gap-2">
          <p className="self-center">{itemName}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleLock(itemType, index)}
          >
            {locked ? (
              <Lock className="text-green-700/70" />
            ) : (
              <Unlock className="text-green-700/30" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

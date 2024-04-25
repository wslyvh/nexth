'use client'
import { useState, useEffect } from 'react'

interface TokenQuantityInputProps {
  onChange: (amount: string) => void
  quantity: string
  maxValue?: string
  displayRangeInput?: boolean
  displayMaxClearButtons?: boolean
}
export function TokenQuantityInput({
  onChange,
  quantity,
  maxValue,
  displayRangeInput = true,
  displayMaxClearButtons = true,
}: TokenQuantityInputProps) {
  const [amount, setAmount] = useState('0.00')

  const smallestStep = parseFloat(amount) < 1 ? 1 / Math.pow(10, maxValue?.split('.')[1].length ?? 1) : 1

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only allow numbers and one decimal point
    if (!/^\d*\.?\d*$/.test(e.target.value)) {
      return
    }
    setAmount(e.target.value)
    onChange(e.target.value)
  }

  const handleSetMax = () => {
    setAmount(maxValue ?? '0.00')
    onChange(maxValue ?? '0.00')
  }

  const handleClear = () => {
    setAmount('0.00')
    onChange('0.00')
  }

  useEffect(() => {
    setAmount(quantity)
  }, [quantity])

  return (
    <div className='flex flex-col gap-2'>
      <input
        type='text'
        placeholder='0.01'
        value={amount}
        className='input input-bordered w-full max-w-xs'
        onChange={(e) => handleChange(e)}
      />

      <div className={`${displayMaxClearButtons ? 'flex' : 'hidden'}  flex-row gap-2 w-full`}>
        <button onClick={handleSetMax} className='btn btn-xs btn-outline btn-neutral'>
          Max
        </button>
        <button onClick={handleClear} className='btn btn-xs btn-outline btn-neutral'>
          Clear
        </button>
      </div>
      <input
        onChange={(e) => handleChange(e)}
        value={amount}
        type='range'
        min={0}
        step={smallestStep}
        max={maxValue ?? 100}
        className={`${displayRangeInput ? 'block' : 'hidden'} range range-xs`}
      />
    </div>
  )
}

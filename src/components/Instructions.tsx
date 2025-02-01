import { FC, ReactElement } from 'react'
import { Modal } from '../sharedComponents'
import { InstructionsProps } from '../types'

const Instructions: FC<InstructionsProps> = ({ onStart }): ReactElement => {
  return (
    <Modal backdropStyle="bg-gray-600" boxStyle="w-110 h-full bg-purple-200">
      <div className="text-purple-700 text-2xl mt-40 px-4 font-medium text-center">
        <div className="mb-4">Instructions</div>
        <div>1. Click on a tile to flip it.</div>
        <div>2. Flip tiles to match pairs.</div>
        <div>3. If all tiles match, you win.</div>
        <button
          className="mt-8 border border-purple-400 bg-purple-800 py-2 px-4 rounded-md cursor-pointer hover:bg-purple-300 active:scale-90 text-white"
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </Modal>
  )
}

export default Instructions
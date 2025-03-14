import { useEffect, useState, FC, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import Instructions from './Instructions'
import { getShuffledSlots } from '../utils/helperFunctions'
import { TILE_VARIETIES } from '../utils/constants'
import { TileType } from '../types'

const REPEAT_NUM = 2

const FlipGame: FC = (): ReactElement => {
  const [tiles, setTiles] = useState<TileType[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedIndices, setMatchedIndices] = useState<number[]>([])
  const [showInstructions, setShowInstructions] = useState<boolean>(false)

  useEffect(() => {
    setupGame();
    setShowInstructions(true)
  }, [])

  useEffect(() => {
    if (flippedIndices.length === REPEAT_NUM) {
      if (tiles[flippedIndices[0]].name === tiles[flippedIndices[1]].name) {
        setMatchedIndices([...matchedIndices, flippedIndices[0], flippedIndices[1]])
      }
      // Empty the flippedIndices when it reaches REPEAT_NUM
      // This also helps to reverse flip after a sec when tiles don't match
      setTimeout(() => {
        setFlippedIndices([])
      }, 1000);
    }
  }, [flippedIndices.length])

  const setupGame = () => {
    setShowInstructions(false)
    setFlippedIndices([])
    setMatchedIndices([])
    setTiles(getShuffledSlots(TILE_VARIETIES, REPEAT_NUM))
  }

  const handleFlip = (index: number): void => {
    if (flippedIndices.length === REPEAT_NUM || flippedIndices.includes(index) || matchedIndices.includes(index)) return
    setFlippedIndices([...flippedIndices, index])
  }

  return (
    <>
      {showInstructions && <Instructions onStart={setupGame} />}
      <main className="flex flex-col gap-8 items-center py-16 bg-purple-100 min-h-screen">

        <section className="text-center text-purple-700">
          <h1 className="text-6xl font-bold mb-2">Flippo</h1>
          <div className="text-gray-600">A Memory Game <img className="w-3 h-3 inline cursor-pointer align-baseline" alt="info" title="Instructions" src="/info.svg" onClick={() => setShowInstructions(true)} /></div>
        </section>

        <section className="border-4 border-purple-600 grid grid-cols-4 gap-1 p-1 bg-white rounded-md">
          {tiles.map((tile, index) => (
            <div
              key={index}
              // className={`w-24 h-24 p-4 flex items-center justify-center border border-purple-400 cursor-pointer rounded-sm bg-purple-200 hover:bg-purple-300 transition-transform duration-200 ${flippedIndices.includes(index) || matchedIndices.includes(index) ? 'rotate-y-180' : ''}`}
              className={twMerge("xs:w-16 xs:h-16 md:w-24 md:h-24 p-4 flex items-center justify-center border border-purple-400 cursor-pointer rounded-sm bg-purple-200 hover:bg-purple-300 transition-transform duration-200", flippedIndices.includes(index) || matchedIndices.includes(index) ? 'rotate-y-180' : '')}
              onClick={() => handleFlip(index)}
            >
              {(flippedIndices.includes(index) || matchedIndices.includes(index)) ? (
                <img alt={`tile-${index + 1}-${tile.name}`} src={tile.url} />
              ) : (
                <img alt={`tile-${index + 1}-flip`} src="/Card-Flip.svg" />
              )}
            </div>
          ))}
        </section>

        <section className="">
          {(matchedIndices.length === TILE_VARIETIES.length * REPEAT_NUM) && (
            <div className="text-gray-800 text-md mb-2">You Won!</div>
          )}
          <button
            className="border border-purple-400 bg-purple-200 py-2 px-4 rounded-md cursor-pointer hover:bg-purple-300 active:scale-90 text-gray-800"
            onClick={() => setupGame()}
          >
            Reset
          </button>
        </section>

      </main>
    </>
  )
}

export default FlipGame
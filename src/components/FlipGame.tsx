import { useEffect, useState } from 'react'
import { getShuffledSlots } from '../utils/helperFunctions'
import { TILE_VARIETIES } from '../utils/constants'
import { TileType } from '../types'

const REPEAT_NUM = 2

const FlipGame = () => {
  const [tiles, setTiles] = useState<TileType[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedIndices, setMatchedIndices] = useState<number[]>([])

  useEffect(() => {
    setupGame();
  }, [])

  useEffect(() => {
    if (flippedIndices.length === REPEAT_NUM) {
      if (tiles[flippedIndices[0]].name === tiles[flippedIndices[1]].name) {
        setMatchedIndices([...matchedIndices, flippedIndices[0], flippedIndices[1]])
      }
      setTimeout(() => {
        setFlippedIndices([])
      }, 1000);
    }
  }, [flippedIndices.length])

  const setupGame = () => {
    setFlippedIndices([])
    setMatchedIndices([])
    setTiles(getShuffledSlots(TILE_VARIETIES, REPEAT_NUM))
  }

  const handleFlip = (index: number): void => {
    if (flippedIndices.length === REPEAT_NUM || flippedIndices.includes(index) || matchedIndices.includes(index)) return
    setFlippedIndices([...flippedIndices, index])
  }

  return (
    <main className="flex flex-col gap-8 items-center pt-16 bg-purple-100 h-[100vh]">

      <section className="text-center text-purple-700">
        <h1 className="text-6xl font-bold mb-2">Flippo</h1>
        <h4 className="text-gray-600">A Memory Game</h4>
      </section>

      <section className="border-4 border-purple-600 grid grid-cols-4 gap-1 p-1 bg-white rounded-md">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center border border-purple-400 cursor-pointer rounded-sm transition-transform duration-300 bg-purple-200"
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
          <div className="">You Won!</div>
        )}
        <button
          className="border border-purple-400 bg-purple-200 py-2 px-4 rounded-md cursor-pointer"
          onClick={() => setupGame()}
        >
          Reset
        </button>
      </section>
    </main>
  )
}

export default FlipGame
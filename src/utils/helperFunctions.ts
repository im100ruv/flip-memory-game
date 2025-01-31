export const getShuffledSlots = (items: any[], repeatCount: number = 1): any[] => {
  const slots = new Array(items.length * repeatCount).fill(null)
  let position = null
  items.forEach(item => {
    //For each item, find empty position randomly and place the item.
    //Repeat 'repeatCount' times
    new Array(repeatCount).fill('').forEach(() => {
      do {
        position = Math.floor(Math.random() * items.length * repeatCount)
      } while (slots[position] !== null)
      slots[position] = item
    })
    position = null
  })
  return slots
}

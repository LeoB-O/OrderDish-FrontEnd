export function findDishById (content, id) {
  for (let cata of content) {
    for (let item of cata.items) {
      item.id = parseInt(item.id)
      id = parseInt(id)
      if (item.id === id) {
        return item
      }
    }
  }
}

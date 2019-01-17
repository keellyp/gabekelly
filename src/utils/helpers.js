export const textSplitter = word => {
  const oldWord = word
  const newWord = oldWord.innerText.split('')
  oldWord.textContent = ''
  newWord.forEach(letter => {
    const letterEl = document.createElement('div')
    letterEl.textContent = letter
    oldWord.appendChild(letterEl)
  })
}

export const nodelistToArray = nodelist => {
  const array = [].slice.call(nodelist)
  return array
}

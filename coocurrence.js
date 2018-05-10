var fs = require('fs');
var catStr = fs.readFileSync('./cat-in-the-hat.txt').toString();

//console.log('catStr: ', catStr)
const wordRegex =  /\b[a-zA-Z]+\b/g

function cooccurrence(s, a, b, k) {
  let arr = s.toLowerCase().match(wordRegex, ''), occurrences = [], hits = 0
  arr.forEach((word, index) => {
    if (word === a) {
      occurrences.push([word, index])
    }
  })

  if (occurrences.length === 0) {
    return '0.00'
  }

  //console.log('arr: ', arr)
  // console.log('occurrences: ', occurrences)

  occurrences.map(subArr => {
    for (let i = subArr[1] - k; i <= subArr[1] + k; i++) {
      if (i === subArr[1]) {
        continue
      }

      if (arr[i] === b) {
        hits++
        break
      }
    }
  })

  return (hits / occurrences.length).toFixed(2)


}

//cooccurrence('I like dessert, and I like Dessert Labs', 'dessert', 'like', 3)
//cooccurrence('I like dessert, and I like Dessert Labs', 'dessert', 'labs', 3)
//cooccurrence('I like dessert, and I like Dessert Labs', 'labs', 'dessert', 3)
console.log(cooccurrence(catStr, 'hat', 'cat', 3))
console.log(cooccurrence(catStr, 'cat', 'hat', 3))
console.log(cooccurrence(catStr, 'sit', 'sit', 3))
console.log(cooccurrence(catStr, 'dessert', 'labs', 3))

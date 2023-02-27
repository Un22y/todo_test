export const find = (word,array) => {
      if (!word) return array
      const specs = '(){}[]'
      for (let i=0; i<specs.length; i++) 
      if (word.includes(specs[i])) word = word.replaceAll(specs[i], `\\` + specs[i],'')
      const rgx = new RegExp(word,'gi')
      console.log(rgx)
      return(array.filter(item => item.name.match(rgx)))
}
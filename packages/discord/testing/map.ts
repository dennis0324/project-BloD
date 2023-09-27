function t(){
  const a = new Map()
  console.log('run')
  a.set('a',1)
  a.set('b',2)
  a.set('c',3)
  a.set('d',4)
  a.set('e',5)


  a.forEach((v,k) => {
    console.log(v,k)
  })
}

t()
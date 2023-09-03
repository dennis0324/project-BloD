class promiseDisocrd{
  private resolve: (value?: unknown) => void
  constructor(){

  }

  public ready(){
    return new Promise(resolve => {
      this.resolve = resolve
    })
  }

  public connectionReady(){
    this.resolve()
  }

}


const testing = new promiseDisocrd()

testing.ready().then( () => {
  console.log('ready')
})

testing.connectionReady()

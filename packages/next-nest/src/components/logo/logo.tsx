export default function LogoPic({className}:{className?:string}){
  const morseCode:number[][] = [[0,0,1,0,1,1,1,1,0,0,1,0,0,0,1,0,1,0,1,0],[1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0]];
  return (
    <div id="LogoDiv" className={`logo ${className}`}>
        <div className="morsecode-lines">
            {
                morseCode.map((line,index) => {
                    return(
                        <div key={index} className="morsecode-line">
                            {
                                line.map((bit,bitIndex) => {
                                    return (
                                        <div key={bitIndex} className={`morseCode ${bit ? 'long' : 'short'}`}></div>
                                    )
                                })
                            }
                        </div>
                    )

                })
            }
        </div>
        <div>
            FOXSTAR DEVLOG
        </div>
    </div>
) 
}
import React from "react"
import "./index.css"

export type Mode = 'main' | 'footer'

type props = {
    mode:Mode
}

function logo(props:props){
    const morseCode:number[][] = [[0,0,1,0,1,1,1,1,0,0,1,0,0,0,1,0,1,0,1,0],[1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0]];
    return (
        <React.Fragment>
            <div id="LogoDiv" className="logo">
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
        </React.Fragment>
    )
}

export default logo
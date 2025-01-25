import React, { useState } from 'react'


function Summary(summary){
    return <div>
        <h2>{summary.name}</h2>
        
    </div>
}

export  function RenderSummaries() {
    const [summaries,setSummaries] = useState([])
  return (
    <div>
        {summaries.map((summary)=>{
            return 
        })}
    </div>
  )
}

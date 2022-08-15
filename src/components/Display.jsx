

export default function Display(props){
    const neoInfo = props.neoInfo;
    
    const neoSize = neoInfo.diameter*15+5
    //const neoTime = ((1-neoInfo.closestTime/2400) *100).toString()+'%'
    const neoTime = ((1-neoInfo.closestTime/2400) *400)
    const fill = props.selected? '#444':'#000'
      return(
        <div onClick={props.handleClick}>
            {neoInfo &&
            <svg overflow='visible' xmlns="http://www.w3.org/2000/svg" width='50' height="400" viewBox="0 0 50 400">
                <rect x='24' width='2' height={neoTime} fill={fill}/>
                <circle cx='50%' cy={neoTime+neoSize} r={neoSize.toString()} fill={fill}/>
            </svg>}
            
        </div>
    )
}
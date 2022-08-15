
export default function NeoInfo(props){
    const neoInfo = props.neoInfo;
    
    return(
        
        <div>
            <div className='info'> 
                <h4>NEO Name: {neoInfo.neoName}</h4>
                <h4>Time closest to Earth: {neoInfo.closestTime}</h4>
                <h4>Diameter: {neoInfo.diameter} km</h4>
                <h4>Closest Distance: {neoInfo.closestLunar} Lunars</h4>
                <h4>Speed: {neoInfo.speedkms} km/s</h4>
            </div>
        </div>
    )
}
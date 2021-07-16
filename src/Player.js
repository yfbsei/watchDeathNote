import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const Player = () =>  {
    const [type, setType] = useState("DUB");
    const [epi, setEpi] = useState(1);
    const [url, setUrl] = useState("https://streamani.net/streaming.php?id=OTA3OTk=&amp;title=Death+Note+%28Dub%29+episode+1")

useEffect(() => {

    fetch(`https://api.npoint.io/f5059a6746ff8baa2dd8/${type}/${epi-1}`)
    .then(res => {
        if(res.ok) {return res.json()}
    }).then(data => setUrl(type === "DUB" ? `https://streamani.net/streaming.php?id=${data.token}=&amp;title=Death+Note+%28Dub%29+episode+${epi}` : `https://streamani.net/streaming.php?id=${data.token}=&amp;title=Death+Note+Episode+${epi}`))

}, [type, epi])

    const switchType = (e) => {
      
        if(type === "DUB") {
            
            setType("SUB"); 
            e.target.innerText = "Watch Dub";
        } 

        if(type === "SUB") {

            setType("DUB"); 
            e.target.innerText = "Watch Sub";
        }
}
    const nextEpi = () => setEpi(epi + 1);
    const pervouisEpi = () => setEpi(epi - 1);
    const switchEpi = (e) => setEpi(e.target.innerText);
        
const episodeList = [];
for (let i = 1; i <= 37; i++) {episodeList.push(<li key={i} onClick={switchEpi}>{i}</li>)}

    return (
        <div>
            <h2>Episode {epi}</h2>
            <div className="buttons">
{ epi > 1 && <FontAwesomeIcon className="left" icon={faArrowAltCircleLeft} onClick={pervouisEpi} /> }
{ epi < 37 && <FontAwesomeIcon className="right" icon={faArrowAltCircleRight} onClick={nextEpi} /> }
</div>
        <div className="video">
<iframe title="Video Player" src={url} allowFullScreen={true} frameBorder="no" scrolling="no"></iframe>

</div>
<div className="switch">
        <button onClick={switchType}>Watch Sub</button>
    </div> 
  
  <div className="List">
            <ul>{episodeList}</ul>
        </div>

</div>

    );
}

export default Player;

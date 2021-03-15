import React from 'react';
import { useState , useEffect} from 'react'
import Locations from './Locations'

const DragDrop = ({ data, dispatch }) => {

  const [locations, setLocations] = useState([]);

  const [url , setUrl]= useState('');

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];
   

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map(f => f.name)
      files = files.filter(f => !existingFiles.includes(f.name))

      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
    getData(files)
  };

    const fetchMap = async () => {
      const appId = 'aEGh1zJ0shGezyfEAlsK';
      const appCode = '5jLegdvPrJqNuM4uTozN9g';
      const points = locations.map(location => `${location.Latitude},${location.Longitude}`)
      const url = `https://image.maps.api.here.com/mia/1.6/mapview?poi=${points}&app_id=${appId}&app_code=${appCode}`;
      const res = await fetch(url);
     
      return res.url;
    }
  
    useEffect(() => {
      const getCars = async () => {
        const map = await fetchMap()
        setUrl(map)
      }
  
      getCars()
    }, [locations])
  

  const getData=(files)=>{
    
    for (let i = 0; i< files.length ; i++) {
      let f = files[i]
      var reader = new FileReader();
  
      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        let jsonFile='';

        return function (e) {
          try {
            jsonFile = JSON.parse(e.target.result);
            setLocations(jsonFile)
          } catch (ex) {
            alert('ex when trying to parse json = ' + ex);
          }
        }
      })(f);
      reader.readAsText(f);
    }
  
  }


  return (
    <>
    <div className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
      <p>Drag files here to see locations on map</p>
    </div>
    <img alt='map' src={url}></img>
    <br/>
    <Locations locations= {locations}/>
    </>
  );
};

export default DragDrop;

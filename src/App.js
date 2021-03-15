import React from 'react';
import './index.css';
import DragDrop from './components/DragDrop'

function App() {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth }
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
  )

  return (
    <div className="App">
      <DragDrop data={data} dispatch={dispatch} />
    </div>
  );
}

export default App;
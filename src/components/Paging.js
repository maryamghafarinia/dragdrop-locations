import React from "react"; 
import Button from "@material-ui/core/Button"; 
import { useTheme } from "@material-ui/core/styles"; 
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"; 
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"; 
import MobileStepper from "@material-ui/core/MobileStepper"; 
  
const Pagination = ({index , onForwardButton , onPreviousButton}) => { 
  const theme = useTheme(); 
  return ( 
    <div> 
      <MobileStepper 
        steps={1} 
        variant="dots"
        style={{ 
           flexGrow: 1, 
        }} 
        activeStep={index} 
        position="static"
        nextButton={ 
          <Button size="small" 
                  onClick={onPreviousButton}  
                  disabled={index === 1}> 
            Next 
            {theme.direction !== "rtl" ? ( 
              <KeyboardArrowRight /> 
            ) : ( 
              <KeyboardArrowLeft /> 
            )} 
          </Button> 
        } 
        backButton={ 
          <Button size="small" 
                  onClick={onForwardButton}  
                  disabled={index === 0}> 
            {theme.direction !== "rtl" ? ( 
              <KeyboardArrowLeft /> 
            ) : ( 
              <KeyboardArrowRight /> 
            )} 
            Back 
          </Button> 
        } 
      /> 
    </div> 
  ); 
}; 
  
export default Pagination; 
import { useState} from 'react'
import Pagination from './Paging'
import { Table, TableBody, TableHead , TableRow, TableContainer , TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const Locations = ({locations ,onToggle , onOpen}) => {
  const [index, setActiveStep] = useState(0); 

  // Pagination
  const forwardButton = () => { 
    setActiveStep((prevActiveStep) => prevActiveStep - 1 ); 
  }; 
  
  // Pagination
  const previousButton = () => { 
    setActiveStep((prevActiveStep) => prevActiveStep + 1 ); 
  }; 

  let TOTAL_ITEMS = 0;


  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  return (
    <>
     {locations.length > 0 ? (
      <div>

        <TableContainer component={Paper}>
    
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location, index) => ( 
              <TableRow key={index} data-testid="locations">
              <TableCell>{index + 1 }</TableCell>
              <TableCell>{location.Name}</TableCell>
              <TableCell>{location.Latitude} , {location.Longitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination 
          index= {index} 
          totalItems= {TOTAL_ITEMS}
          onForwardButton = {forwardButton}
          onPreviousButton = {previousButton}
        />
        </TableContainer>
        </div>
        ) : (
          'No Locations To Show'
        )}
    </>
  )
}

export default Locations

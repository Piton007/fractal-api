import React,{useState,useEffect} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import TextField from '@material-ui/core/TextField';
import './App.css';

function App() {
  const [rowData, setRowData] = useState([]);
  const [query,setQuery] = useState("")


useEffect(() => {
     fetch(`${process.env.REACT_APP_API_URL}/clients`)
     .then(result => result.json())
     .then(rowData => { setRowData(rowData)})
 }, []);
  return (
    <div className="ag-theme-alpine" style={ { height: '600px', width: '600px',margin:"0 auto" } }>
          <div className="search">
            <TextField
              autoFocus
              value= {query}
              onChange={(e)=>{setQuery(e.target.value)}}
              margin="dense"
              label="Search"
              type="text"
            />
          </div>
         
            <AgGridReact
                pagination={true}
                quickFilterText={query}
                rowData={rowData}>

                <AgGridColumn field="firstName" filter={true} sortable={true} ></AgGridColumn>
                <AgGridColumn field="lastName"  filter={true}sortable={true}></AgGridColumn>
                <AgGridColumn field="email"  filter={true}sortable={true}></AgGridColumn>
                <AgGridColumn field="phone" filter={true} sortable={true}></AgGridColumn>
            </AgGridReact>
      </div>
  );
}

export default App;

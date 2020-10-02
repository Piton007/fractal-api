import React,{useState,useEffect} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import './App.css';

function App() {
  const [rowData, setRowData] = useState([]);

useEffect(() => {
     fetch("http://localhost/clients")
     .then(result => result.json())
     .then(rowData => { setRowData(rowData.results)})
 }, []);
  return (
    <div className="ag-theme-alpine" style={ { height: '400px', width: '600px',margin:"0 auto" } }>
            <AgGridReact
                pagination={true}
                rowData={rowData}>
                <AgGridColumn field="firstName" sortable={true}></AgGridColumn>
                <AgGridColumn field="lastName" sortable={true}></AgGridColumn>
                <AgGridColumn field="email" sortable={true}></AgGridColumn>
                <AgGridColumn field="phone" sortable={true}></AgGridColumn>
            </AgGridReact>
      </div>
  );
}

export default App;

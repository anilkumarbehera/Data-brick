import React, { useState, useEffect } from 'react';
import './App.css';

const jsonData = {
  project_name: "Project",
  output_name: "default_output",
  table_headers: [
    { name: "Row", type: "serial" },
    { name: "Territory", type: "string" },
    { name: "Date", type: "string" },
    { name: "Units", type: "int" },
    { name: "Average_Unit_Price", type: "float" },
    { name: "TV_Total", type: "float" },
    { name: "Video_on_Demand", type: "float" },
    { name: "Proof_of_Concept_Spend", type: "float" },
    { name: "Print_Spend", type: "float" },
    { name: "Online_Display", type: "int" },
    { name: "FSI_Coupon", type: "float" },
    { name: "Feature", type: "float" },
    { name: "Display", type: "float" },
    { name: "Price_Reduction", type: "float" },
    { name: "Feat_and_Disp", type: "float" },
    { name: "Pct_Discount", type: "float" },
    { name: "Competitor_Distribution_1", type: "int" },
    { name: "Competitor_Distribution_2", type: "int" },
    { name: "Competition_Units", type: "int" },
  ],
  table_data: [
    ["1", "Brick 001", "2021-01-01", "298", "5.7819", "0.0", "0.0", "0.0", "0.0", "0", "0.0", "0.0", "0.0827", "0.0", "0.0", "0.0016", "38", "14", "4675"],
    ["2", "Brick 001", "2021-02-01", "327", "5.8471", "94.1656", "0.0", "0.0", "0.0", "0", "0.0", "0.0", "0.0289", "0.0", "0.0", "0.0", "37", "19", "4888"],
    ["3", "Brick 001", "2021-03-01", "296", "5.8209", "122.7687", "0.0", "0.0", "0.0", "0", "0.0", "0.0", "0.1469", "0.018", "0.0", "0.0107", "41", "17", "4444"],
    ["4", "Brick 001", "2021-04-01", "288", "5.9479", "129.9336", "0.0", "0.0", "0.0", "0", "0.0", "0.0", "0.0842", "0.0", "0.0", "0.0048", "36", "21", "4190"],
    ["5", "Brick 001", "2021-04-01", "288", "5.9479", "129.9336", "0.0", "0.0", "0.0", "0", "0.0", "0.0", "0.0842", "0.0", "0.0", "0.0048", "36", "21", "4190"],
  ],
};

const App = () => {
  const [data, setData] = useState(jsonData.table_data);
  const [newRow, setNewRow] = useState(Array(jsonData.table_headers.length).fill(''));
  const [dataTypes, setDataTypes] = useState({});

  useEffect(() => {
    // Determine the data type for each column based on existing data
    const types = {};
    jsonData.table_headers.forEach((header, index) => {
      const columnData = data.map(row => row[index]);
      // Determine the type based on the data
      if (columnData.every(value => Number.isInteger(Number(value)))) {
        types[index] = 'int';
      } else if (columnData.every(value => !isNaN(value) && value.includes('.'))) {
        types[index] = 'float';
      } else {
        types[index] = 'string';
      }
    });
    setDataTypes(types);
  }, [data]);

  const handleAddRow = () => {
    if (newRow.every((val) => val !== "")) {
      setData([...data, newRow]);
      setNewRow(Array(jsonData.table_headers.length).fill(''));
    } else {
      alert("Please fill all fields");
    }
  };

  const handleInputChange = (e, index) => {
    const updatedRow = [...newRow];
    updatedRow[index] = e.target.value;
    setNewRow(updatedRow);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
    }
  };

  return (
    <div className="App">
      <h1>{jsonData.project_name}</h1>
      <table>
        <thead>
          <tr>
            {jsonData.table_headers.map((header, i) => (
              <th key={i}>{header.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              <td>
                <button onClick={() => handleDelete(rowIndex)} className="delete-btn">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
          <tr>
            {jsonData.table_headers.map((header, index) => (
              <td key={index}>
                <input
                  type="text"
                  value={newRow[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder={`Enter ${header.name}`}
                />
              </td>
            ))}
            <td>
              <button onClick={handleAddRow} className="add-btn">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;

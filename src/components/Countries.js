import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import CountriesData from '../CountriesData';
import './Countries.css'
import ThemeToggle from '../ThemeToggle';


function Countries() {

    //const {isDarkMode}=useTheme(); 
    const[isDarkMode,setIsDarkMode]=useState()

  const [data, setData] = useState(CountriesData);
  const [sortBy, setSortBy] = useState('');
  const [oddPopulation, setOddPopulation] = useState([]);

  const isPerfectSquare = (num) => {
    const sqrt = Math.sqrt(num);
    return sqrt - Math.floor(sqrt) === 0;
  };

  const handleSelectionChange = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);

    if (selectedOption === 'Sort Population') {
      // Sort the data in ascending order by population
      const sortedPopulation = [...CountriesData].sort((a, b) => a.population - b.population);
      setData(sortedPopulation);
    } else if (selectedOption === 'Countries with letters P,S,K') {
      // Filter data to display only countries with letters P, S, and K in their names
      const filteredData = CountriesData.filter((country) => /p|s|k/i.test(country.country));
      setData(filteredData);
    } else if (selectedOption === 'Population is Perfect Square') {
      // Filter data to display only countries with a population that is a perfect square
      const perfectSquareData = CountriesData.filter((country) => isPerfectSquare(country.population));
      setData(perfectSquareData);
    } else if (selectedOption === 'New Array') {
      // Filter data to include countries with a name length of 5, 6, or 7 and odd population
      const newArrayData = CountriesData.filter(
        (country) =>
          (country.country.length === 5 || country.country.length === 6 || country.country.length === 7) &&
          country.population % 2 !== 0
      );

      setOddPopulation(newArrayData);

      console.log("New Generated Array",newArrayData)// Check the new array on the console

    } else if(selectedOption === 'Sort by Name Length'){
         // Sort the data in ascending order by the length of the country name
      const sortedNameLength = [...CountriesData].sort((a, b) => a.country.length - b.country.length);
      setData(sortedNameLength);

    }else {
      // If other options are selected, reset the data to the original dataset
      setData(CountriesData);
    }
  };

  function heading(){
    if (sortBy==="All"){
        return <h3>All Countries</h3>
    } else if(sortBy==="Sort Population"){
        return <h3>Sort countries based on pupulation in ascending order</h3>
    } else if(sortBy==="Countries with letters P,S,K"){
        return <h3>Countries whose name contains either letter P,S or k</h3>
    } else if(sortBy==="Population is Perfect Square"){
        return <h3>Countries whose population is a perfect square</h3>
    } else if(sortBy==="New Array"){
        return <h4>New Array data with countries of an odd population and has a name with 5,6 or 7 letters</h4>
    } else {
        return <h3>Sorted Countries based on their name length</h3>
    }
  }

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' :''}`}>
        <ThemeToggle/>
       <div className='text-primary'> {heading()}</div>
   
      <label className='me-2 text-3 text-bold bg-dark text-primary'>
        Filter Here:
        <select
          className='m-2 bg-light text-primary p-2'
          value={sortBy}
          onChange={handleSelectionChange}
        >
        <option>All</option>
          <option>Sort Population</option>
          <option>Countries with letters P,S,K</option>
          <option>Population is Perfect Square</option>
          <option>New Array</option>
          <option>Sort by Name Length</option>
        </select>
      </label>

      <Table className='container'>
        <thead>
          <tr className='bg-grey'>
            <th>Name</th>
            <th>Population</th>
          </tr>
        </thead>

        <tbody>
          {sortBy === 'New Array' ? (
            // Display the oddPopulation array if the option is "New Array"
            oddPopulation.map((country) => (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td>{country.population}</td>
              </tr>
            ))
          ) : (
            // Display the regular data for other options
            data.map((country) => (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td>{country.population}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Countries;

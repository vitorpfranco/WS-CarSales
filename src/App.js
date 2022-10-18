import axios from "axios";
import { useEffect, useState } from "react";


function App() {

  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get('/cars.json')
    setCars(res.data)
  }
  useEffect(() => {
    fetchCars()
  }, [])

  return (
    <div className="App">
      {cars.map((car) => (<div key={car.id}>{car.nome_modelo}</div>))}
    </div>
  );
}

export default App;

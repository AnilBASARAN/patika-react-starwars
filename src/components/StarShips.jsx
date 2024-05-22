import { useEffect, useState } from "react";
import axios from "axios";

function StarShips() {
  const [starShips, setStarShips] = useState([]);
  const [filteredStarShips, setFilteredStarShips] = useState("");
  const [selectedShip, setSelectedShip] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [newShipData, setNewShipData] = useState({
    name: "",
    model: "",
    hyperdrive_rating: "",
    manufacturer: "",
    length: "",
    max_atmosphering_speed: "",
    crew: "",
  });

  const filtered = starShips.filter((starShip) => {
    return (
      (starShip.name &&
        starShip.name
          .toLowerCase()
          .includes(filteredStarShips.toLowerCase())) ||
      (starShip.model &&
        starShip.model.toLowerCase().includes(filteredStarShips.toLowerCase()))
    );
  });

  useEffect(() => {
    axios("https://swapi.dev/api/starships/")
      .then((res) => setStarShips(res.data.results))
      .catch((error) => console.error("Error fetching starships:", error));
  }, []);

  const handleDetailsClick = (ship) => {
    setSelectedShip(ship);
    setIsVisible(false);
  };

  const handleCloseDetails = () => {
    setSelectedShip(null);
    setIsVisible(true);
  };

  const handleAddShip = () => {
    const newShip = {
      name: newShipData.name || "Unknown",
      model: newShipData.model || "Unknown",
      hyperdrive_rating: newShipData.hyperdrive_rating || "Unknown",
      manufacturer: newShipData.manufacturer || "Unknown",
      length: newShipData.length || "Unknown",
      max_atmosphering_speed: newShipData.max_atmosphering_speed || "Unknown",
      crew: newShipData.crew || "Unknown",
    };

    setStarShips((prevShips) => [...prevShips, newShip]);

    setNewShipData({
      name: "",
      model: "",
      hyperdrive_rating: "",
      manufacturer: "",
      length: "",
      max_atmosphering_speed: "",
      crew: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShipData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div>
              <img
              src="data:image/png;base64,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"
                alt="yellow"
                id="starwars-yellow"
              />
      </div>
      {isVisible && (
            <>
            <input
              placeholder="Filter by Name & Model..."
              value={filteredStarShips}
              onChange={(e) => setFilteredStarShips(e.target.value)}
              style={{ backgroundColor: 'yellow', color: 'black', padding: '10px', border: '1px solid black', borderRadius: '5px' }}
            />
            <button
              style={{ color: 'white', backgroundColor: 'purple', padding: '10px', border: 'none', borderRadius: '5px' }}
              onClick={() => {
                // Perform filtering action here
                console.log(filteredStarShips);
              }}
            >
              Filter
            </button>
          </>

      )}

      {isVisible && (
        <div className="card-container">
          {filtered.map((starShip) => (
            <div key={starShip.name} className="card">
              <img
                src="https://img.redbull.com/images/q_auto,f_auto/redbullcom/2017/09/20/0bba35af-bf8c-4296-8cbd-1e4ccedfcc6a/star-wars-spaceships-millennium-falcon"
                alt={starShip.name}
                className="ship-image"
              />
              <h2>{starShip.name}</h2>
              <p>
                <span>Model:</span> {starShip.model}
              </p>
              <p>
                <span> Hyperdrive Rating:</span> {starShip.hyperdrive_rating}
              </p>
              <button
                className="details"
                onClick={() => handleDetailsClick(starShip)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedShip && (
        <div className="details-overlay">
          <div className="details-card">
            <img
              src="https://img.redbull.com/images/q_auto,f_auto/redbullcom/2017/09/20/0bba35af-bf8c-4296-8cbd-1e4ccedfcc6a/star-wars-spaceships-millennium-falcon"
              alt={selectedShip.name}
              className="ship-image"
            />
            <h2>{selectedShip.name}</h2>
            <p>
              <span>Model:</span> {selectedShip.model}
            </p>
            <p>
              <span>Hyperdrive Rating:</span> {selectedShip.hyperdrive_rating}
            </p>
            <p>
              <span>Manufacturer:</span> {selectedShip.manufacturer}
            </p>
            <p>
              <span>Length:</span> {selectedShip.length}
            </p>
            <p>
              <span>Max Atmosphering Speed:</span>
              {selectedShip.max_atmosphering_speed}
            </p>
            <p>
              <span> Crew:</span> {selectedShip.crew}
            </p>
            <button className="close" onClick={handleCloseDetails}>
              Close
            </button>
          </div>
        </div>
      )}

      <hr />

      {isVisible && (
        <div className="add-ship-form">
          <h2>Add New Ship</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newShipData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={newShipData.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hyperdrive_rating"
            placeholder="Hyperdrive Rating"
            value={newShipData.hyperdrive_rating}
            onChange={handleChange}
          />
          <input
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
            value={newShipData.manufacturer}
            onChange={handleChange}
          />
          <input
            type="text"
            name="length"
            placeholder="Length"
            value={newShipData.length}
            onChange={handleChange}
          />
          <input
            type="text"
            name="max_atmosphering_speed"
            placeholder="Max Atmosphering Speed"
            value={newShipData.max_atmosphering_speed}
            onChange={handleChange}
          />
          <input
            type="text"
            name="crew"
            placeholder="Crew"
            value={newShipData.crew}
            onChange={handleChange}
          />
          <button className="add-ship" onClick={handleAddShip}>
            Add Ship
          </button>
        </div>
      )}
    </div>
  );
}

export default StarShips;

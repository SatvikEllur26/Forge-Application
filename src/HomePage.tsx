import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://dealership.naman.zip/cars/sort?key=price&direction=asc");
        if (!response.ok) {
          throw new Error(`Failed to fetch cars: ${response.statusText}`);
        }

        const data: Car[] = await response.json();
        setCars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Available Cars</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cars.map((car) => (
          <li key={car.id} style={{ marginBottom: "20px" }}>
            <Link to={`/car/${car.id}`} style={{ textDecoration: "none", color: "black" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img src={car.image} alt={`${car.make} ${car.model}`} style={{ width: "150px", height: "100px", objectFit: "cover" }} />
                <div>
                  <h2>
                    {car.year} {car.make} {car.model}
                  </h2>
                  <p>Price: ${car.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

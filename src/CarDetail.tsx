import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  condition?: string;
  fuel_type?: string;
  transmission?: string;
  color?: string;
  vin?: string;
  image?: string;
  description?: string;
}

const CarDetail = () => {
  const { id } = useParams<{ id: string }>(); // UseParams returns a Record<string, string | undefined>
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("Car ID is missing");
        }

        const response = await fetch(`https://dealership.naman.zip/car/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch car details: ${response.statusText}`);
        }

        const data: Car = await response.json();
        setCar(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div>
      <h1>
        {car.year} {car.make} {car.model}
      </h1>
      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        style={{ width: "300px", height: "200px", objectFit: "cover" }}
      />
      <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
      <p><strong>Mileage:</strong> {car.mileage?.toLocaleString()} miles</p>
      <p><strong>Condition:</strong> {car.condition}</p>
      <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
      <p><strong>Transmission:</strong> {car.transmission}</p>
      <p><strong>Color:</strong> {car.color}</p>
      <p><strong>VIN:</strong> {car.vin}</p>
      <p><strong>Description:</strong> {car.description}</p>
    </div>
  );
};

export default CarDetail;

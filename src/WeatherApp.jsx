import { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'abe2b757e366986cbdbc92083b572e5c';

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">🌦️ Weather App</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={getWeather}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {weather && (
          <div className="text-center mt-4">
            <h2 className="text-3xl font-semibold text-blue-800">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg capitalize text-gray-600 mt-1">
              {weather.weather[0].description}
            </p>
            <p className="text-5xl font-bold text-blue-700 mt-4">
              {weather.main.temp}°C
            </p>
            <div className="flex justify-center gap-6 mt-6 text-gray-700">
              <div className="text-sm">
                <span className="font-semibold">Humidity:</span> {weather.main.humidity}%
              </div>
              <div className="text-sm">
                <span className="font-semibold">Wind:</span> {weather.wind.speed} m/s
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;

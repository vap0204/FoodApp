import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import AddFoodForm from "./AddFood";

const App = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const foodsPerPage = 5;

    const fetchFoods = useCallback(async () => {
        try {
            const response = await fetch("api/food/GetFoods");
            if (!response.ok) {
                throw new Error("Failed to fetch foods");
            }
            const data = await response.json();
            setFoods(data);
            setFilteredFoods(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchFoods();
    }, [fetchFoods]);

    const handleAddFood = async (newFood) => {
        try {
            const response = await fetch("/api/food/AddFood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFood)
            });
            if (!response.ok) {
                throw new Error("Failed to add food");
            }
            fetchFoods();
            window.location.href = "/";
        } catch (error) {
            console.error("Error adding food:", error);
        }
    };

    const handleSearch = (query) => {
        const filteredResults = foods.filter(food =>
            food.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFoods(filteredResults);
    };

    const handleFoodSelect = (foodId) => {
        const selectedFood = foods.find(food => food.id === foodId);
        if (!selectedFoods.some(food => food.id === foodId)) {
            setSelectedFoods([...selectedFoods, selectedFood]);
        } else {
            setSelectedFoods(selectedFoods.filter(food => food.id !== foodId));
        }
    };

    const indexOfLastFood = currentPage * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const calculateTotal = () => {
        const totalCalories = selectedFoods.reduce((acc, food) => acc + food.calories, 0);
        const totalProtein = selectedFoods.reduce((acc, food) => acc + food.protein, 0);
        const totalFat = selectedFoods.reduce((acc, food) => acc + food.fat, 0);
        const totalCarbs = selectedFoods.reduce((acc, food) => acc + food.carbs, 0);

        setTotalCalories(totalCalories);
        setTotalProtein(totalProtein);
        setTotalFat(totalFat);
        setTotalCarbs(totalCarbs);
    };

    useEffect(() => {
        calculateTotal();
    }, [selectedFoods]);

    return (
        <Router>
            <div className="container">
                <h1>Welcome to Food App</h1>
                <div>
                    <Link to="/">
                        <button className="btn btn-link">Home</button>
                    </Link>
                    <Link to="/add-food">
                        <button className="btn btn-link">Create Food</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <SearchForm onSearch={handleSearch} />
                            <div className="row">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Calories</th>
                                            <th>Protein(g)</th>
                                            <th>Fat(g)</th>
                                            <th>Carbs(g)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentFoods.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleFoodSelect(item.id)}
                                                        checked={selectedFoods.some(food => food.id === item.id)}
                                                    />
                                                </td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.calories}</td>
                                                <td>{item.protein}</td>
                                                <td>{item.fat}</td>
                                                <td>{item.carbs}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <nav>
                                    <ul className="pagination">
                                        {Array.from({ length: Math.ceil(filteredFoods.length / foodsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(i + 1)} className="page-link">
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    } />
                    <Route path="/add-food" element={<AddFoodForm onAdd={handleAddFood} />} />
                </Routes>
            </div>
            <div className="container">
                <h2>Selected Foods</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Protein(g)</th>
                            <th>Fat(g)</th>
                            <th>Carbs(g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedFoods.map((food) => (
                            <tr key={food.id}>
                                <td>{food.name}</td>
                                <td>{food.calories}</td>
                                <td>{food.protein}</td>
                                <td>{food.fat}</td>
                                <td>{food.carbs}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total:</p>
                <ul>
                    <li>Calories: {totalCalories}</li>
                    <li>Protein: {totalProtein}g</li>
                    <li>Fat: {totalFat}g</li>
                    <li>Carbs: {totalCarbs}g</li>
                </ul>
            </div>
        </Router>
    );
}

export default App;

import React, { useState } from "react";

const AddFoodForm = ({ onAdd }) => {
     // дефиниране на състоянието на данните на храната
    const [foodData, setFoodData] = useState({
        name: "",
        calories: "",
        protein: "",
        fat: "",
        carbs: ""
    });
    // функция за обработка на промяната на полетата за въвеждане
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({
            ...foodData,
            [name]: value
        });
    };
    // функция за обработка на подадените данни на формата
    const handleSubmit = (e) => {
        e.preventDefault();
        // проверка дали всички полета са попълнени
        if (!foodData.name || !foodData.calories || !foodData.protein || !foodData.fat || !foodData.carbs) {
            alert("Please fill in all fields");
            return;
        }
        // проверка дали числовите полета са числа
        const numericFields = ['calories', 'protein', 'fat', 'carbs'];
        for (const field of numericFields) {
            if (isNaN(foodData[field])) {
                alert(`${field.charAt(0).toUpperCase() + field.slice(1)} must be a number`);
                return;
            }
        }

        // проверка дали числовте полета са неотрицателни
        for (const field of numericFields) {
            if (parseFloat(foodData[field]) < 0) {
                alert(`${field.charAt(0).toUpperCase() + field.slice(1)} must be non-negative`);
                return;
            }
        }

        // добавяне на храна и изчистване на формата
        onAdd(foodData);
        setFoodData({
            name: "",
            calories: "",
            protein: "",
            fat: "",
            carbs: ""
        });

    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-group">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        class="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={foodData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Calories:</label>
                    <input 
                        class="form-control"
                        type="number"
                        name="calories"
                        placeholder="Calories"
                        value={foodData.calories}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Protein:</label>
                    <input
                        class="form-control"
                        type="number"
                        name="protein"
                        placeholder="Protein"
                        value={foodData.protein}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fat:</label>
                    <input
                        class="form-control"
                        type="number"
                        placeholder="Fat"
                        name="fat"
                        value={foodData.fat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Carbs:</label>
                    <input
                        class="form-control"
                        type="number"
                        placeholder="Carbs"
                        name="carbs"
                        value={foodData.carbs}
                        onChange={handleChange}
                        required
                    />
                </div>
                <hr />
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-plus"></i> ADD
                </button>
            </form>
        </div>
    );
};

export default AddFoodForm;

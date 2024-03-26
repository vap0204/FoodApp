import React from "react";
import { Link } from "react-router-dom";

const AddFoodButton = () => {
    return (
        <Link to="/add-food" className="btn btn-primary">
            Add Food
        </Link>
    );
}

export default AddFoodButton;

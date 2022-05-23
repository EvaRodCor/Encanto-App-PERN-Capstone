import React from 'react';
import { useState } from "react";
import axios from "axios";
import Select from "react-select";


const FoodForm = ({callBackFood, currentUser}) => {
    const API = process.env.REACT_APP_API_URL;
    
    const [ user, setUser ] = useState(currentUser);

    // console.log("foodform: ", user)

    const handleInputChange = (event) => {
        setUser({ ...user, food_pref: event.value});
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${API}/users/${user.id}`, user);
        callBackFood(user.food_pref)
    };

    const options = [
        { value: "", label: "---select---" },
        { value: "american", label: "American"},
        { value: "caribbean", label: "Caribbean"},
        { value: "chinese", label: "Chinese"},
        { value: "english", label: "English"},
        { value: "french", label: "French"},
        { value: "italian", label: "Italian"},
        { value: "japanese", label: "Japanese"},
        { value: "korean", label: "Korean"},
        { value: "mexican", label: "Mexican"},
        { value: "peruvian", label: "Peruvian"},
        { value: "vegan", label: "Vegan"}
    ];
    
    const dropdown = 
    <Select
        name="food_pref"
        id="food_pref"
        value={options.value}
        options={options}
        defaultValue={options.find((cuisine) => user.food_pref === cuisine.value)}
        onChange={handleInputChange}
    />

    return (
    <form onSubmit={handleEdit}>
        <label htmlFor="food_pref"> Choose food preference:</label>  
        {dropdown}      
        <button type="submit">Submit</button>
    </form>
    );
}

export default FoodForm;

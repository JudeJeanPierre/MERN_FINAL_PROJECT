import React from "react";

function NavbarCat({ items, setItems }) {
    const handleClick = (event) => {
        let category = event.target.innerText;
        console.log(category);

        fetch("/api/items/category/" + category)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems(data);
            });
    };
    return (
        <div className="sidebar">
            <button onClick={handleClick}>Headphones</button>
            <button onClick={handleClick}>Keyboard & Mouse</button>
            <button onClick={handleClick}>Monitor</button>
            <button onClick={handleClick}>Cell Phones</button>
            <button onClick={handleClick}>televisions</button>
        </div>
    );
}

export default NavbarCat;
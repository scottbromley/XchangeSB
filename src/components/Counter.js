import React, { useState } from 'react';

function Counter() {

    const [count, setCount] = useState(4)

    function decrementCount() {
        setCount(prevCount => prevCount - 1)
    };

    function increaseCount() {
        setCount(lastCounter => lastCounter + 1)
    };

    return (
        <div>
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <button onClick={increaseCount}>+</button>
        </div>
    );
};


export default Counter;
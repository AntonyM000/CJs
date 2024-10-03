import React from 'react'
import { useData } from '../hooks/useData';

    

const SecondMenu = () => {
    const { loading, error, products,combos } = useData();

  return (
    <div>
      <h3>Breakfast Combos</h3>
      {combos.length > 0 ? (
        <ul>
          {combos.map((product) => (
            <li key={product.id}  className="flex flex-col mb-4">
              
              <strong className="text-lg">{product.name}</strong> 
              <p>Description: {product.Description}</p>
                <p>Price: KSH {product.value}</p>
                {product.imageUrl && (
                  <img className="rounded-lg w-52 mt-2" src={product.imageUrl} alt={product.name} />
                )}

            </li>
          ))}
        </ul>
      ) : (
        <p>No combos found.</p>
      )}
    </div>
  )
}

export default SecondMenu
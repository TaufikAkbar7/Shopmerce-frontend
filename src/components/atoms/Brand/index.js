import React from 'react'
import { useHistory } from 'react-router';
import './brand.css';
const Brand = ({ color }) => {

    const history = useHistory();

    return (
        <div>
            <span className="brand" style={{color: color}} onClick={() => history.push('/')}>Shopmerce</span>
        </div>
    )
}

export default Brand

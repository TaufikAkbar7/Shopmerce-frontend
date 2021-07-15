import React from 'react'
import './title.css';

const Title = ({ text, margin, className }) => {
    return (
        <div className={className} style={{margin: margin}}>
            <h3 className="font">{text}</h3>
        </div>
    )
}

export default Title

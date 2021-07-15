import React from 'react'

const Text = ({ name, marginLeft, totalHarga, ...rest }) => {
    return (
        <div {...rest}>
            <span>{name}</span>
            <span style={{ marginLeft: marginLeft }}>{totalHarga}</span>
        </div>
    )
}

export default Text

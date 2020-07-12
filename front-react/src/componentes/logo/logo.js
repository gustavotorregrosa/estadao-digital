import React from 'react'
import carroLogo from '../../assets/car-logo.jpeg'
import 'materialize-css/dist/css/materialize.min.css'

const logo = () => (
    <div>
        <img src={carroLogo} style={{
            maxHeight: "12em"
        }} className="responsive-img" />
    </div>
)

export default logo

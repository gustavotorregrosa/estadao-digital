import React from 'react'

const estilizar = (Componente, objStyle) => (
    <div style={objStyle}>
        <Componente />
    </div>
)

export default estilizar
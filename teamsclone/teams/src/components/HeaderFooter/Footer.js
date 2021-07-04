import React from 'react'

function Footer() {
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return (
        <div style={{width: "100%", textAlign: "center", position: "absolute", bottom: "0"}}>
            <p>Copyright Aditi Tiwari © {year}</p>
        </div>
    )
}

export default Footer

const Footer = () => {
    return (
        <div style={{textAlign: "center"}}>
            Fecha y Hora: {(new Date()).toLocaleString()}
        </div>
    )
}

export default Footer

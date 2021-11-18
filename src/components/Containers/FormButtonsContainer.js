const FormButtonsContainer = (props) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                margin: "40px",
            }}
        >
            <div
                style={{
                    width: "300px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default FormButtonsContainer

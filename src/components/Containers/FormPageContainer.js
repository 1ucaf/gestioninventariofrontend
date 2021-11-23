const FormPageContainer = (props) => {
    return (
        <div style={
            {
                height: 400,
                display: "flex",
                width: '100%',
                margin: "auto",
                // marginTop: "30px",
                justifyContent: "center",
                flexWrap: "wrap"
            }
        }>
            <div style={
                {
                    width: "90%"
                }
            }>
                {props.children}
            </div>
        </div>
    )
}

export default FormPageContainer

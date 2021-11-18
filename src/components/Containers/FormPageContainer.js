const FormPageContainer = (props) => {
    return (
        <div style={
            {
                height: 400,
                width: '100%',
                margin: "auto",
                marginTop: "30px",
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

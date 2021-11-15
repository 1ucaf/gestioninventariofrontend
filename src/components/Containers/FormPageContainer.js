const FormPageContainer = (props) => {
    return (
        <div style={
            {
                height: 400,
                width: '100%',
                display: "flex",
                justifyContent: "space-evenly" ,
                marginTop: "30px",
                flexWrap: "wrap"
            }
        }>
                {props.children}
        </div>
    )
}

export default FormPageContainer

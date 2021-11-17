import { display } from "@mui/system"

const FormGroup = (props) => {
    return (
        <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                margin: "40px",
                flexWrap: "wrap",
            }} >
            {props.children}
        </div>
    )
}

export default FormGroup

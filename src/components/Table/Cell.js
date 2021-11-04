import React, { useState } from 'react';
import './Main.css';

const Cell = (props) => {
    const [value, setValue] = useState(props.value);
    const [bgColor, setBgColor] = useState(props.isFixed?"#C1C6D8":"");
    // console.log(props.value);
    return (
        <td
            style={props.value?.toString()[0] === "-" ? {
                    height: 90,
                    left: props.leftMargin,
                    minWidth: props.currentCellWidth,
                    maxWidth: props.currentCellWidth,
                    backgroundColor: bgColor,
                    color: "red",
                } : {
                    height: 90,
                    left: props.leftMargin,
                    minWidth: props.currentCellWidth,
                    maxWidth: props.currentCellWidth,
                    backgroundColor: bgColor,
                }
            }
            className={props.isFixed ? "fixed-column-cell" : ""}
            align={props.align ? (props.align) : ("left")}
        >
                {props.isEditable && !props.isFixed?
                
                    <sdds-textfield type="text" value={value} onInput={(event)=> {
                        // setValue(event.target.value)
                        setBgColor("red");
                        setValue(event.target.value);
                        props.onChangeValue(props.columnText, props.tableId, event.target.value);
                        //aquí hay que tratar de colorear la celda de otro color
                    }}>
                    </sdds-textfield>
                :
                    props.value
                }
        </td>
    )
}

export default Cell

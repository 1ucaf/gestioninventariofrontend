import React from 'react'
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cell from './Cell';

export default function Row({tableId, dataRow, columns, id, isCopyTable, isSelectTable, isSelected, iconButtons, idColumn, checkBoxButtons, onClick, onChangeValue}) {
    // var fixedColumnsCount = 0;
    var leftMarginAcc = 0;
    // const [isSelectedState, setIsSelectedState] = useState(isSelected);

    const createHtmlTableElementForCopying = () => {
        let documentHead = document.getElementById(tableId).getElementsByTagName("thead")[0].innerHTML;
        let documentRow = document.getElementById(tableId + id).innerHTML;
        let newElement = document.createElement("div");
        newElement.setAttribute("id", "copyrow");
        newElement.innerHTML =
            "<table>" +
                    documentHead +
                "<tbody>" +
                    documentRow +
                "</tbody>" +
            "</table>";
        document.getElementById("root").appendChild(newElement);
        newElement.childNodes[0].childNodes[1].childNodes[0].childNodes[columns.length].remove(); // this line here removes the "Copy Button" from the HEADER of the copied row element
        newElement.childNodes[0].childNodes[0].childNodes[0].childNodes[columns.length].remove(); // this line here removes the "Copy Button" from the copied row element
        return newElement;
    };
    const copyEvent = () =>{
        // var textToCopy = "";
        // columns.forEach((column)=>{
        //     textToCopy += column.text.toUpperCase() + "\t";
        // });
        // textToCopy += "\n";
        // columns.forEach((column)=>{
        //     textToCopy += dataRow[column.key] + "\t";
        // });
        // navigator.clipboard.writeText(textToCopy);

        let elementToCopy = createHtmlTableElementForCopying();
        let range;
        let selection;
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElement(elementToCopy);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            selection.removeAllRanges();
            range = document.createRange();
            range.selectNodeContents(elementToCopy);
            selection.addRange(range);
        }
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        document.getElementById("copyrow").remove();
    }


    
    return (
        <tr onClick={onClick} id={tableId+id} className={(isSelectTable ? "selectable-row " + (isSelected ? "selected-row" : "") : "")}>
            {
                columns.map((column, cellIndex) => {
                    var currentCellWidth = column.width ? column.width : 120;
                    if(!column.isFixed && !column.width) {
                        currentCellWidth = "auto";
                    }
                    var leftMargin = leftMarginAcc;
                    if(column.isFixed){
                        leftMarginAcc += currentCellWidth;
                        // fixedColumnsCount++;
                    }
                    return  (
                            <Cell
                                value={dataRow[column.key]}
                                leftMargin={leftMargin}
                                currentCellWidth={currentCellWidth}
                                isFixed={column.isFixed}
                                key={column.key}
                                align={column.align}
                                isEditable={dataRow.isEditable}
                                onChangeValue={onChangeValue}
                                columnText={column.text}
                                tableId={tableId}
                            />
                            // <td
                            // style={dataRow[column.key].toString()[0] === "-" ? {
                            //         height: 90,
                            //         left: leftMargin,
                            //         minWidth: currentCellWidth,
                            //         maxWidth: currentCellWidth,
                            //         color: "red",
                            //     } : {
                            //         height: 90,
                            //         left: leftMargin,
                            //         minWidth: currentCellWidth,
                            //         maxWidth: currentCellWidth,
                            //     }
                            // }
                            // className={column.isFixed ? "fixed-column-cell" : ""}
                            // key={column.key}
                            // align={column.align ? (column.align) : ("left")}
                            // >
                            //     {dataRow.isEditable && !column.isFixed?
                                
                            //         <sdds-textfield type="text" value={values[column.key]} onInput={(event)=> {
                            //             // setValue(event.target.value)
                            //             const aux = {...values};
                            //             aux[column.key] = event.target.value;
                            //             setValues(aux);
                            //             console.log(values);
                            //             onChangeValue(column.text, tableId, event.target.value);
                            //             //aquí hay que tratar de colorear la celda de otro color
                            //         }}>
                            //         </sdds-textfield>
                            //     :
                            //         dataRow[column.key]
                            //     }
                            // </td>
                    )
                })
            }
            {
                iconButtons !== undefined ?
                iconButtons.map(iconButton => {
                    return  <td style={{width: "1px"} } key={iconButton.key} align="center">
                                <button onClick={()=>iconButton.behaviour(dataRow[idColumn])} className="sdds-btn sdds-btn-primary wrap-text"> 
                                    <FontAwesomeIcon icon={iconButton.icon} />
                                </button>
                            </td>
                })
                : (<></>)
            }
            {
                checkBoxButtons !== undefined ?
                checkBoxButtons.map(checkBox => {
                    return(
                        <td style={{width: "1px"} } key={checkBox.key} align="center">
                            <div className="checkbox-container" id={dataRow[idColumn]} onClick={()=>checkBox.behaviour(dataRow[idColumn])}>
                                <div className="sdds-checkbox-item">
                                    <input className="sdds-form-input" type="checkbox" name="cb-example" checked={dataRow.isSelected}/>
                                </div>
                            </div>
                        </td>)
                })
                : (<></>)
            }
            {isCopyTable? (
                    <td align="center" className="copy-row-button-cell">
                        <button onClick={copyEvent} className="sdds-btn sdds-btn-primary wrap-text" id="right-1">Copiar Fila</button>
                    </td>
                ) : (
                    <></>
                ) 
            }
        </tr>
    )
}

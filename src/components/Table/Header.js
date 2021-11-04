import React from 'react';
import './Main.css'

export default function Header({columns, isCopyTable, tableId}) {
    // var fixedColumnsCount = 0;
    var leftMarginAcc = 0;
    
    const createHtmlTableElementForCopying = () => {
        let documentTable = document.getElementById(tableId).innerHTML;
        let newElement = document.createElement("table");
        newElement.setAttribute("id", "copyrow");
        newElement.innerHTML = documentTable
        document.getElementById("root").appendChild(newElement);
        newElement.childNodes[0].childNodes[0].childNodes[columns.length].remove(); // this line here removes the "Copy Button" from the HEADER of the copied row or table
        let copiedTableRowsCout = newElement.childNodes[1].childNodes.length;
        let index = 0;
        for (index = 0; index<copiedTableRowsCout; index++)
        {
            newElement.childNodes[1].childNodes[index].childNodes[columns.length].remove(); // this line here removes the "Copy Button" from each one of the copied rows
        }
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
        <thead className="my-div" id="cabecera">
            <tr>
            {
                columns.map((column, index) => {
                    var currentCellWidth = column.width ? column.width : 120;
                    if(!column.isFixed && !column.width) {
                        currentCellWidth = "auto";
                    }
                    var leftMargin = leftMarginAcc;
                    if(column.isFixed){
                        leftMarginAcc += currentCellWidth;
                        // fixedColumnsCount++;
                    }
                    return(<th style={{height: 90, left: column.isFixed ? leftMargin : 0, minWidth: currentCellWidth, maxWidth: currentCellWidth}} className={column.isFixed ? "fixed-column-head-cell" : ""} id={index} key={column.key}>{column.text}</th>)
                })
            }
                {isCopyTable ? (
                        <th align="center" className="copy-button-cell">
                            <button className="sdds-btn sdds-btn-primary wrap-text" id="right-1" onClick={copyEvent}>Copiar Tabla</button>
                        </th>
                    ) : (
                        <></>
                    ) 
                }
            </tr>
        </thead>
    )
}

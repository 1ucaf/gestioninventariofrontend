import React, { useEffect, useState } from 'react';
import Header from './Header';
import Row from './Row';


export default function Table(props) {
    const dataIsValid = () => {
        if(!props.data || !props.columns)
            return false;
        props.data.forEach(item => {
        if(numberOfFieldsInObject(item) !== props.columns.length)
                return false;
        });
        return true;
    }
    const numberOfFieldsInObject = (obj) => {
        var c = 0, p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                c += 1;
            }
        }
        return c;
    }
    var buttonColumns = [];
    if (props.iconButtons !== undefined) {
        buttonColumns = props.iconButtons.map((button)=>{
            return {key: button.key, text: button.text}
        });
    }
    var checkBoxButtons = [];
    if (props.checkBoxButtons !== undefined) {
        checkBoxButtons = props.checkBoxButtons.map((button)=>{
            return {key: button.key, text: button.text}
        });
    }
    var radioButtons = [];
    if (props.radioButtons !== undefined) {
        radioButtons = props.radioButtons.map((button)=>{
            return {key: button.key, text: button.text}
        });
    }

    const [arrayForStoreSelectedRow, setArrayForStoreSelectedRow] = useState();
    useEffect(()=>{
        setArrayForStoreSelectedRow(props.data?.map(()=> false));
    },[props.data])
    const selectRow = (e)=>{
        if(props.isSelectTable) {
            var index = e.target.parentElement.id[e.target.parentElement.id.length - 1];    //El STRING "id" está formado por muchas cosas, entre ellas, el número que la fila ocupa dentro de la tabla. Dicho número se encuentra al final del string, por lo que con esta línea estoy pudiendo acceder al index de la fila seleccionada.
                                                                                            //EJEMPLO: si el id de la fila es: "tableIdrow7" (id="tableIdrow7"), entonces id[id.length - 1] será 7, que es el número al que quiero acceder.
            props.selectCallBack(props.data[index][props.idColumn]);
            var aux = arrayForStoreSelectedRow?.map(()=> false);
            if(aux) {
                aux[index]=true;
                setArrayForStoreSelectedRow([...aux]);
            }
        }
    }

    const columns = props.columns?.concat(buttonColumns).concat(checkBoxButtons).concat(radioButtons);
    if(dataIsValid()) {
        var i = 0;
        return (
            props.loadingData ? 
            <>
                <div className="center-items">
                    <div className="loader"></div>
                </div>
            </> : <>
                <div className="table-container" style={{maxWidth: props.width?props.width : "auto", minWidth: props.width?props.width : "auto", maxHeight: props.height ? props.height : "auto"}}>
                    <table /* id="tabla" */id={props.tableId?props.tableId : "tableId"}>
                        <Header tableId={props.tableId?props.tableId : "tableId"} columns={columns} isSelectTable={props.isSelectTable} isCopyTable = {props.isCopyTable} iconButtons={props.iconButtons} checkBoxButtons={props.checkBoxButtons}/>
                        <tbody>
                            {props.data.map((dataRow)=>{
                                return <Row tableId={props.tableId?props.tableId : "tableId"} onClick={selectRow} key={i++} id={"row"+i} dataRow={dataRow} columns={props.columns} isSelectTable={props.isSelectTable} isSelected={arrayForStoreSelectedRow?arrayForStoreSelectedRow[i]:false} isCopyTable={props.isCopyTable} iconButtons={props.iconButtons} idColumn={props.idColumn} checkBoxButtons={props.checkBoxButtons} onChangeValue={props.onChangeValue}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    else{
        return (
        <> 
            <div className="center-items">
                <div className="loader"></div>
            </div>
        </>)
    }
    
}

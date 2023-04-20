/*global chrome*/

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'hText', headerName: 'Highlight Text', width: 150 },
  { field: 'sText', headerName: 'Summarized Text', width: 150 },
  { field: 'pDate', headerName: 'Date', width: 140, 
  renderCell: (params: GridRenderCellParams<Date>) => {
    let date = params.value;
    let dateStr =
      date.getFullYear() + "." +
      ("00" + (date.getMonth() + 1)).slice(-2) + "." +
      ("00" + date.getDate()).slice(-2) + ". " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2); 

    return (
      <strong>{ dateStr }</strong>
    )
  }}
];

const Popup = () => {
  interface hData {
    id : number,
    hText : string,
    sText : string,
    pDate : Date
  }

  const [hLightTextList, setHLightTextList] = useState<(hData) []>([]);
  const [AIEnabled, setAIEnabled] = useState<boolean>(true);
=======

const Popup = () => {
  // const [count, setCount] = useState(0);
  // const [currentURL, setCurrentURL] = useState<string>();
  const [hLightTextList, setHLightTextList] = useState<(string | undefined) []>([]);
>>>>>>> 300108903604018ccfea2da1d6fc2c0867eeffd9

  const getSelectedNode = () =>
  {  
    var selection = window.getSelection();
    if (selection!.rangeCount > 0)
        return selection!.getRangeAt(0).startContainer.parentNode;
  }

  useEffect(() => {
    document.addEventListener("mouseup", async (e)=>{
<<<<<<< HEAD
      let checkDom = document.getElementById("AiEnableDom") as HTMLInputElement;

      if(checkDom?.checked) {
        if(window.getSelection() != undefined) {
          let selectedStr = window.getSelection()?.toString();
          if(selectedStr == undefined || selectedStr == '')
            return;
          const selectedNode = getSelectedNode() as HTMLElement;
          selectedNode.setAttribute("style", "background-color: yellow");
          selectedStr = selectedNode.textContent!; 

          let filtered = hLightTextList.filter((r) => { return r.hText == selectedStr })
          
          if(selectedStr !== '' && filtered.length == 0) {
            const response = await fetch("http://127.0.0.1:8090/answer", { headers: { 'content-type': 'application/json;charset=UTF-8' },  method: "POST", body : JSON.stringify({ qus : selectedStr}) });
            const responseText = await Promise.resolve(response.text());
            let textSD : hData = { id : hLightTextList.length + 1, hText : selectedStr, sText : responseText, pDate: new Date() };
            setHLightTextList([...hLightTextList, textSD]);
            selectedNode.setAttribute("title", responseText);
          }
=======
      if(window.getSelection() != undefined) {
        let selectedStr = window.getSelection()?.toString();
        if(selectedStr == undefined || selectedStr == '')
          return;
        const selectedNode = getSelectedNode() as HTMLElement;
        selectedNode.setAttribute("style", "background-color: yellow");
        selectedStr = selectedNode.textContent!; 
        if(selectedStr !== '' && hLightTextList.indexOf(selectedStr!) < 0) {
          setHLightTextList([...hLightTextList, selectedStr]);
          // await fetch()
          const response = await fetch("http://127.0.0.1:8090/answer", { headers: { 'content-type': 'application/json;charset=UTF-8' },  method: "POST", body : JSON.stringify({ qus : selectedStr}) });
          selectedNode.setAttribute("title", await Promise.resolve(response.text()));
>>>>>>> 300108903604018ccfea2da1d6fc2c0867eeffd9
        }
      }
    })
  })

  return (
    <>
<<<<<<< HEAD
      <div style={{backgroundColor: "rgba(255,255,255,0.8)", width:600, height: 700, bottom: 10, right: 20, padding: 20, position: "fixed", zIndex: 100}}>
        <input type="checkbox" id="AiEnableDom" checked={AIEnabled} onChange={e => setAIEnabled(!AIEnabled)}/>
        <label>Enable Generate AI Summarize</label>

          <DataGrid
            rows={hLightTextList}
            columns={columns}
            style={{padding: 20, height: 650}}
          />
=======
      <div style={{backgroundColor: "#222", width:500, height: 200, bottom: 20, right: 20, padding: 20, color:"white", position: "fixed", zIndex: 100}}>
        <select name="hTexts" size={50} style={{width: "100%", height: "100%"}}>
          {
            hLightTextList.map((data : string | undefined) => (<option value={data}>{data}</option>))
          }
        </select>
>>>>>>> 300108903604018ccfea2da1d6fc2c0867eeffd9
      </div>
    </>
  );
};

<<<<<<< HEAD
export default Popup;``
=======
export default Popup;
>>>>>>> 300108903604018ccfea2da1d6fc2c0867eeffd9

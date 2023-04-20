/*global chrome*/

import React, { useEffect, useState } from "react";

const Popup = () => {
  // const [count, setCount] = useState(0);
  // const [currentURL, setCurrentURL] = useState<string>();
  const [hLightTextList, setHLightTextList] = useState<(string | undefined) []>([]);

  const getSelectedNode = () =>
  {  
    var selection = window.getSelection();
    if (selection!.rangeCount > 0)
        return selection!.getRangeAt(0).startContainer.parentNode;
  }

  useEffect(() => {
    document.addEventListener("mouseup", async (e)=>{
      if(window.getSelection() != undefined) {
        let selectedStr = window.getSelection()?.toString();
        if(selectedStr == undefined || selectedStr == '')
          return;
        const selectedNode = getSelectedNode() as HTMLElement;
        selectedNode.setAttribute("style", "background-color: yellow");
        selectedStr = selectedNode.textContent!; 
        if(selectedStr !== '' && hLightTextList.indexOf(selectedStr!) < 0) {
          setHLightTextList([...hLightTextList, selectedStr]);
          const response = await fetch("http://127.0.0.1:8090/answer", { headers: { 'content-type': 'application/json;charset=UTF-8' },  method: "POST", body : JSON.stringify({ qus : selectedStr}) });
          selectedNode.setAttribute("title", await Promise.resolve(response.text()));
        }
      }
    })
  })

  return (
    <>
      <div style={{backgroundColor: "#222", width:500, height: 200, bottom: 20, right: 20, padding: 20, color:"white", position: "fixed", zIndex: 100}}>
        <select name="hTexts" size={50} style={{width: "100%", height: "100%"}}>
          {
            hLightTextList.map((data : string | undefined) => (<option value={data}>{data}</option>))
          }
        </select>
      </div>
    </>
  );
};

export default Popup;

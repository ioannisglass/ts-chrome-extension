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

  // useEffect(() => {
  //   chrome.action.setBadgeText({ text: count.toString() });
  // }, [count]);

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     setCurrentURL(tabs[0].url);
  //   });
  // }, []);
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
          // await fetch()
          const response = await fetch("http://127.0.0.1:8090/answer", { headers: { 'content-type': 'application/json;charset=UTF-8' },  method: "POST", body : JSON.stringify({ qus : selectedStr}) });
          selectedNode.setAttribute("title", await Promise.resolve(response.text()));
        }
      }
    })
  })

  // const changeBackground = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     const tab = tabs[0];
  //     if (tab.id) {
  //       chrome.tabs.sendMessage(
  //         tab.id,
  //         {
  //           color: "#555555",
  //         },
  //         (msg) => {
  //           console.log("result message:", msg);
  //         }
  //       );
  //     }
  //   });
  // };

  return (
    <>
      {/* <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button> */}

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

// const root = createRoot(document.getElementById("root")!);

// root.render(
  // <React.StrictMode>
    // <Popup />
  // </React.StrictMode>
// );

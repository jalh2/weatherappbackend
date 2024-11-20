import { useState } from "react"
import {Form, FormControl, Button, Container } from "react-bootstrap";

function Status() {

  const [result7, setResult7] = useState("");
  const [result8, setResult8] = useState("");
  const [statusuuid, setStatusUuid] = useState("");
  const [statusaccessToken, setStatusAccessToken] = useState("");


  const getStatus = async () => {
      
      setResult7("")
      setResult8("")

      const response7 = await fetch('/api/finance/status', {
        method: 'POST',
        body: JSON.stringify({ statusuuid, statusaccessToken }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json7 = await response7.json()
      
      if (!response7.ok) {
       console.log(json7.error)
      }
      if (response7.ok) {
        setResult7(json7)
        console.log(json7);
       const statustransactionid = json7.externalId;
       const statusstatus = json7.status;
       console.log(statustransactionid);
       console.log(statusstatus);
      
        const response8 = await fetch('/api/question/update', {
        method: 'POST',
        body: JSON.stringify({ statustransactionid, statusstatus }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json8 = await response8.json()
      
      if (!response8.ok) {
       console.log(json8.error)
      }
      if (response8.ok) {

        setResult8(json8)

      } 
    }      
    }

  return (
    <div className="App">
      <table><tbody><tr><td>
      <FormControl type="text"
    value={statusuuid}
    onChange={(e) => setStatusUuid(e.target.value)}
    placeholder="requesttopay uuid" /></td>
    <td>
      <FormControl type="text"
    value={statusaccessToken}
    onChange={(e) => setStatusAccessToken(e.target.value)}
    placeholder="access token" /></td>
    <td>
    <Button onClick={getStatus}>Get Status</Button>
    </td></tr></tbody></table>
    {result7 && <p>{JSON.stringify(result7)}</p>}
    {result8 && <p>{JSON.stringify(result8)}</p>}

    </div>
  );
}

export default Status;

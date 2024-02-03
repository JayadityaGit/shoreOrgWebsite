import { useState } from "react"

import Cookies from "js-cookie";


const App = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("")

  const [response, setResponse] = useState({})

  return (
    <div>


       {JSON.stringify(response)}

      <input type="text" onChange={(event)=>{setEmail(event.target.value)}}  placeholder="give email" />
      <input type="password" onChange={(event)=>{setPassword(event.target.value)}} placeholder="give password" />

      <button onClick={async()=>{
        

          try {

            const body = {
              email: email,
              password: password,
            }
            
           const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json', 
           },
           body: JSON.stringify(body)

          }
           )

           if(response.ok){
            const data = await response.json()

            setResponse(data)

            Cookies.set("token", data.token)

            
           }else{
              const errorBody = await response.json();

              alert(errorBody.error)
           }

         

          } catch (error) {
            console.error(error)
          }
        


      }}>login</button>
    </div>
  )
}

export default App
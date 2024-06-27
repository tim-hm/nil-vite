import React from 'react'
import './App.css'
import {MsgPayFor} from "@nillion/client-web/proto";
import initWasm from "@nillion/client-web";

export function App() {
  const [paymentMessage, setPaymentMessage] = React.useState<MsgPayFor>()

  React.useEffect(() => {
    const message = MsgPayFor.create()
    setPaymentMessage(message)
  }, [])

  if (!paymentMessage) {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Payment message: {JSON.stringify(paymentMessage)}</p>
        <p>Wasm init: {initWasm ? "exported" : "not exported"}</p>
      </div>
    )
  }
}

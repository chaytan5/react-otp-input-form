import { useState } from "react";

import "./App.css";
import OtpInput from "./components/OtpInput";

function App() {
	const [otp, setOtp] = useState<String[]>(new Array(6).fill(""));

	return (
		<div className="App">
			<h1>React OTP Input Component</h1>
			<OtpInput newValue={otp} />
		</div>
	);
}

export default App;

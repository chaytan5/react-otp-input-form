import { useState } from "react";

import "./App.css";
import OtpInput from "./components/OtpInput";
import OtpInputV2 from "./components/OtpInputV2";

function App() {
	const [otp, setOtp] = useState<String[]>(new Array(6).fill(""));
	const [otp2, setOtp2] = useState("");

	function onChange(value: string) {
		setOtp2(value);
	}

	return (
		<div className="App">
			<h1>React OTP Input Component</h1>
			<div className="spacer"></div>
			<OtpInputV2
				value={otp2}
				onChange={onChange}
				valueLength={7}
				type="number"
			/>
		</div>
	);
}

export default App;

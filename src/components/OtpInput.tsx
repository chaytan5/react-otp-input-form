import { useEffect, useRef, useState } from "react";
import React from "react";

type Props = {
	newValue: String[];
};
let currentOtpIdx: number = 0;

const OtpInput = ({ newValue }: Props) => {
	const [currOtp, setCurrOtp] = useState(newValue);
	const [activeOtpIdx, setActiveOtpIdx] = useState<number>(0);

	const inputRef = useRef<HTMLInputElement>(null);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = e.target.value;
		const newOtp: String[] = [...currOtp];
		newOtp[currentOtpIdx] = val.substring(val.length - 1);

		if (!val) {
			setActiveOtpIdx(currentOtpIdx - 1);
		} else {
			setActiveOtpIdx(currentOtpIdx + 1);
		}
		setCurrOtp(newOtp);
	};

	const handleOnKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		currentOtpIdx = index;
		if (e?.key === "Backspace") {
			setActiveOtpIdx(currentOtpIdx - 1);
		}
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOtpIdx]);

	return (
		<div className="form-container">
			<div className="otp-form">
				{currOtp?.map((el, index) => (
					<React.Fragment key={index}>
						<input
							ref={index === activeOtpIdx ? inputRef : null}
							type="number"
							className="otp-form__input spin-button-none"
							onChange={onChangeHandler}
							value={currOtp[index]}
							onKeyDown={(e) => handleOnKeyDown(e, index)}
						/>
						{index === currOtp.length - 1 ? null : (
							<span className="otp-form__separator">-</span>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default OtpInput;

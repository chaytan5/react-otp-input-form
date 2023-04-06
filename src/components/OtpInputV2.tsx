import React, { useMemo } from "react";

type Props = {
	value: string;
	valueLength: number;
	onChange: (value: string) => void;
	type: string;
};
let re = /^\d+$/;

const OtpInputV2 = ({ value, valueLength, onChange }: Props) => {
	const valueItems = useMemo(() => {
		const valueArray = value.split("");
		const items: String[] = [];

		for (let i = 0; i < valueLength; i++) {
			let char = valueArray[i];

			if (re.test(char)) {
				items.push(char);
			} else {
				items.push("");
			}
		}

		return items;
	}, [value, valueLength]);

	function focusToNextElement(target: HTMLInputElement) {
		const nextElementSibling =
			target.nextElementSibling as HTMLInputElement | null;

		if (nextElementSibling) nextElementSibling.focus();
	}

	function focusToPreviousElement(target: HTMLInputElement) {
		const previousElementSibling =
			target.previousElementSibling as HTMLInputElement | null;

		if (previousElementSibling) previousElementSibling.focus();
	}

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const target = e.target;
		let targetValue = target.value.trim();
		const isTargetValueDigit = re.test(targetValue);

		if (!isTargetValueDigit && targetValue !== "") {
			return;
		}

		targetValue = isTargetValueDigit ? targetValue : " ";

		if (targetValue.length === 1) {
			const newValue =
				value.substring(0, index) + targetValue + value.substring(index + 1);

			onChange(newValue);

			if (!isTargetValueDigit) return;

			focusToNextElement(target);
		} else if (targetValue.length === valueLength) {
			onChange(targetValue);
			target.blur();
		}
	};
	function onKeyDownHandler(
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) {
		const { key } = e;
		const target = e.target as HTMLInputElement;

		if (key === "ArrowLeft" || key === "ArrowUp") {
			e.preventDefault();
			return focusToPreviousElement(target);
		}

		if (key === "ArrowRight" || key === "ArrowDown") {
			e.preventDefault();
			return focusToNextElement(target);
		}

		target.setSelectionRange(0, target.value.length);

		if (key !== "Backspace" || target.value !== "") return;
		focusToPreviousElement(target);
	}

	function inputOnFocus(e: React.FocusEvent<HTMLInputElement>) {
		const { target } = e;

		target.setSelectionRange(0, target.value.length);
	}

	return (
		<div className="form-container">
			<div className="otp-form">
				{valueItems?.map((digit, index) => (
					<input
						key={index}
						className="spin-button-none otp-form__input"
						type="text"
						inputMode="numeric"
						autoComplete="one-time-code"
						pattern="\d{1}"
						maxLength={valueLength}
						value={digit as string}
						onChange={(e) => onChangeHandler(e, index)}
						onKeyDown={(e) => onKeyDownHandler(e, index)}
						onFocus={inputOnFocus}
					/>
				))}
			</div>
		</div>
	);
};

export default OtpInputV2;

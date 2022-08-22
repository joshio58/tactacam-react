import React from 'react'

export const FormGroup = ({ children, className }) => {
	return (
		<>
			<div className={`form-group${className ? ' ' + className : ''}`}>
				{children}
			</div>
		</>
	)
}

export const FormLabel = ({ label, elemName }) => {
	return (
		<label htmlFor={elemName}>
			<span className="form-item__label-name">{label}</span>
		</label>
	)
}

export const TextInput = ({
	usePl,
	useLabelAndPl,
	phText,
	label,
	elemName,
	elemVal,
	onChange,
	className,
	req,
	note,
	disabled,
	readOnly,
	type,
	min,
	max,
	step,
	inputStyle,
}) => {
	const classType = 'form-item__' + (type ? type : 'text')
	const disabledCssClass = 'input--disabled'
	const readOnlyCssClass = 'input--read-only'
	// const focusedCssClass = 'input--focus'
	// const isEmptyCssClass = 'input--empty'
	// const isInvalidCssClass = 'input--invalid'

	return (
		<div
			className={`form-item${className ? ' ' + className : ''} ${classType}-input${
				disabled ? ' ' + disabledCssClass : ''
			}${readOnly ? ' ' + readOnlyCssClass : ''}`}
		>
			{!usePl && (
				<>
					<FormLabel label={label} elemName={elemName}></FormLabel>

					{type === 'file' && (
						<div className="form-item__upload-instructions">
							<span>Drag and Drop File Here</span>
							<span>Or</span>
							<span>Click to Select File</span>
						</div>
					)}
					{note && (
						<InfoBox variant="info">
							<p className="field-instructions">{note}</p>
						</InfoBox>
					)}
					<div className="form-item__input-wrapper">
						<input
							key="input-1"
							type={type ? type : 'text'}
							placeholder={
								usePl
									? label
									: useLabelAndPl
									? phText
										? phText
										: label
									: null
							}
							name={elemName}
							value={elemVal}
							onChange={onChange}
							disabled={disabled ? true : false}
							readOnly={readOnly ? true : false}
							min={min}
							max={max}
							step={step}
							style={inputStyle}
						/>
						{req && <RequiredFlag />}
					</div>
				</>
			)}
			{usePl && (
				<div className="form-item__input-wrapper">
					{type === 'file' && (
						<div className="form-item__upload-instructions">
							<span>Drag and Drop File Here</span>
							<span>Or</span>
							<span>Click to Select File</span>
						</div>
					)}
					<input
						key="input-1"
						type={type ? type : 'text'}
						placeholder={
							usePl
								? label
								: useLabelAndPl
								? phText
									? phText
									: label
								: null
						}
						name={elemName}
						value={elemVal}
						onChange={onChange}
						disabled={disabled ? true : false}
						readOnly={readOnly ? true : false}
						min={min}
						max={max}
						step={step}
						style={inputStyle}
					/>
					{req && <RequiredFlag />}
				</div>
			)}
			{/* <div className="validation input-text-validation"></div> */}
		</div>
	)
}

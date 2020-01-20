/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

function SelectInput({
	label,
	placeholder,
	classNames,
	name,
	required,
	value,
	error,
	onChange,
	option,
	onBlur,
}) {
	return (
		<div data-test='input-form' className='form-group'>
			{label && <label htmlFor={name}>{label}</label>}
			<select
				id={name}
				className={classNames}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				onBlur={onBlur}
			>
				<option disabled value=''>
					{`Select ${placeholder}`}
				</option>
				{option.map(({ value, name, id }) => (
					<option key={id} value={value}>
						{name}
					</option>
				))}
			</select>
			{error && error !== '' && (
				<span data-testid='error-text' className='invalid-feedback'>
					{error}
				</span>
			)}
		</div>
	);
}

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string,
	classNames: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	required: PropTypes.bool,
	option: PropTypes.array.isRequired,
	error: PropTypes.string,
};

SelectInput.defaultProps = {
	label: null,
	classNames: null,
	placeholder: null,
	onChange: null,
	onBlur: null,
	required: false,
	value: '',
	error: null,
};

export default SelectInput;

import {
	Autocomplete as AutocompleteMUI,
	type ChipTypeMap,
} from "@mui/material";

import TextField from "./TextField";
import type { CustomAutoCompleteWoControlProps } from "../../types/uiTypes";
import type { JSX, ReactNode } from "react";

const AutocompleteWoControl = <
	Value,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
>({
	options = [],
	label,
	fullWidth = true,
	id,
	value,
	...props
}: CustomAutoCompleteWoControlProps<
	Value,
	Multiple,
	DisableClearable,
	FreeSolo,
	ChipComponent
	>): JSX.Element => {
	return (
		<AutocompleteMUI
			{...props}
			value={value}
			id={id}
			options={options}
			renderInput={
				props.renderInput ??
				((parameters): ReactNode => (
					<TextField
						{...parameters}
						error={!!props.error}
						helperText={props.helperText}
						id={id}
						label={label}
						fullWidth={fullWidth}
					/>
				))
			}
			// eslint-disable-next-line unicorn/explicit-length-check
			size={props.size || "small"}
			fullWidth={fullWidth}
			disableCloseOnSelect={props.multiple}
		/>
	);
};
export default AutocompleteWoControl;
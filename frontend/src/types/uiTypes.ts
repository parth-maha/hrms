import type {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import type { AutocompleteProps, ChipTypeMap } from "@mui/material";

//==================== AUTOCOMPLETEWOCONTROL ===================
export type CustomAutoCompleteWoControlProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> = Partial<FormComponentError> & {
  id: string;
  options: Array<string>;
  label?: string;
  limitTag?: number;
} & Partial<
    AutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >
  >;

export type FormComponentError = {
  errors?: FieldErrors;
  errorKey?: string;
  error?: boolean;
  helperText?: string;
  hidden?: boolean;
};


// =========================== MODAL PROPS ==============================
type ModalSize =
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| `${number}%`
	| `${number}rem`;

export interface CommonModalProps {
	openState: boolean;
	title: React.ReactNode;
	title2?: React.ReactNode;
	onClose: () => void;
	children?: React.ReactNode;
	sizes?: [ModalSize, ModalSize, ModalSize, ModalSize];
	closeOnClickOutside?: boolean;
	closeOnEscape?: boolean;
	zIndex?: number;
	withCloseButton?: boolean;
	styles?: {
		root?: React.CSSProperties;
		body?: React.CSSProperties;
		overlay?: React.CSSProperties;
	};
	contentPadding?: { pt?: number; pb?: number; pl?: number; pr?: number };
}


export type ConfirmBoxPros = {
	opened: boolean;
	title: string;
	children: React.ReactNode;
	confirmLabel: string;
	cancelLabel: string;
	onConfirm: () => void;
	onCancel: () => void;
	zIndex?: number;
	withCloseButton?: boolean;
};

export type CustomAutoCompleteProps<
	TField extends FieldValues,
	Value,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = Partial<FormComponentError> & {
	id: string;
	control: Control<TField>;
	name: Path<TField>;
	options: Array<string>;
	label?: string;
	rules?: RegisterOptions;
	limitTag?: number;
} & Partial<
		AutocompleteProps<
			Value,
			Multiple,
			DisableClearable,
			FreeSolo,
			ChipComponent
		>
	>;
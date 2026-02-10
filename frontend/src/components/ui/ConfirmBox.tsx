import type { ConfirmBoxPros } from "../../types/ui.types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";
import { DialogContent, Card, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PopupTransition } from "../../components/ui/Transition";

// Styled Main Card for ConfirmBox
const StyledMainCard = styled(Card)(({ theme }) => ({
    background: "#fff",
    margin: "10px",
    boxShadow: "none",
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function isNullOrEmpty(value: any): boolean {
    return (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
    );
}

const ConfirmBox: React.FunctionComponent<ConfirmBoxPros> = ({
    opened,
    title,
    children,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    zIndex,
    withCloseButton,
}) => {
    return (
        <BootstrapDialog
            onClose={onCancel}
            aria-labelledby="customized-dialog-title"
            open={opened}
            sx={{
                zIndex: zIndex || 1300,
                "& .MuiDialog-paper": { p: 0, backgroundImage: "none" },
            }}
            TransitionComponent={PopupTransition}
        >
            <div className="grid grid-cols-12 gap-4">
                <DialogTitle
                    sx={{ m: 0, p: 2 }}
                    id="customized-dialog-title"
                    className="col-span-10"
                >
                    {title}
                </DialogTitle>
                {withCloseButton ? (
                    <IconButton
                        id="confirm-box-close"
                        aria-label="close"
                        onClick={onCancel}
                        color="error"
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </div>
            <DialogContent sx={{ padding: "0 !important" }}>
                <div>
                    {isNullOrEmpty(children) ? null : (
                        <StyledMainCard>
                            <CardContent sx={{ px: 2, py: 3 }}>
                                {children}
                            </CardContent>
                        </StyledMainCard>
                    )}
                    <div className="flex justify-end gap-2 mt-4 pr-4 pb-4">
                        <Button
                            id="cancel-confirm-box"
                            variant="text"
                            onClick={onCancel}
                            color="error"
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            id="confirm-confirm-box"
                            color="primary"
                            variant="contained"
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </BootstrapDialog>
    );
};

export default ConfirmBox;
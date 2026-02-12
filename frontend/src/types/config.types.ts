export interface ConfigListProps {
    onAddConfig: () => void;
    onEditConfig: (data: Config) => void;
    onDeleteConfig  : (id : number | null) => void
    configs: Config[] | undefined;
}

export interface Config{
    Id : number;
    CreatedBy : string;
    ConfigName : string;
    ConfigId : string;
    ConfigValue : string;
}

export interface ConfigFormData{
    CreatedBy : string | null;
    ConfigName : string;
    ConfigId : string;
    ConfigValue : string;
}

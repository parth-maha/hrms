export interface ConfigListProps {
    onAddConfig: () => void;
    onEditConfig: (data: Config) => void;
    onDeleteConfig  : (id : number) => void
    configs: Config[] | undefined;
}

export interface Config{
    id : number;
    createdBy : string;
    configName : string;
    configId : string;
    configValue : string;
}

export interface ConfigFormData{
    CreatedBy : string | null;
    ConfigName : string;
    ConfigId : string;
    ConfigValue : string;
}

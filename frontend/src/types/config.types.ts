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


export interface GameFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface GameListProps{
  onAdd : () => void
  onEdit : (game : Game) => void
  onDelete : (id : number) => void
  games : Game[] | undefined
}

export interface Game{
  id : number;
  gameName : string;
  duration : number;
  gameStartTime : string;
  gameEndTime : string;
  noOfSlots : number;
  maxMembers : number;
}

export interface GameFormData{
  gameName : string;
  duration : number;
  gameStartTime : string;
  gameEndTime : string;
  noOfSlots : number;
  maxMembers : number;
}
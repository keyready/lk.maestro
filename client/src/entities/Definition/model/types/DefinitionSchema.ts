import { Definition } from './Definition';

export interface DefinitionSchema {
    data?: Definition;
    isLoading: boolean;
    error?: string;
}

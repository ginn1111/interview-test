declare global {
  type NullishValue<T> = null | undefined | T;
  interface ToolLanguage {
    id: number;
    toolLanguageResourceId: number;
    displayOrder: number;
    name: string;
    from: number;
    to: number;
    description?: string;
    images: {
      id: number;
      cdnUrl: string;
      displayOrder: number;
    }[];
  }

  interface Position {
    id: number;
    positionResourceId: number;
    displayOrder: number;
    name: string;
    toolLanguages: ToolLanguage[];
  }

  interface EmployeeProfile {
    id: number;
    name: string;
    positions: Position[];
  }

  interface FmtEmployeeProfile {
    name: string;
    id: number;
    positionNames: string[];
    exps: number;
    description: string;
    images: string[];
  }

  interface PositionResource {
    positionResourceId: number;
    name: string;
    toolLanguageResources: ToolLanguageResource[];
  }

  interface ToolLanguageResource {
    toolLanguageResourceId: number;
    positionResourceId: number;
    name: string;
  }
}

export {};

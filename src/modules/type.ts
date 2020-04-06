export interface ILayout {
  id: number;
  pages: IPage[];
}

export interface IPage {
  name: string;
  visuals: IVisual[];
}

export interface IVisual {
  id: string;
  moduleId: string;
  content: any;
}

export interface BaseModule {
  name: string;
  description: string;
}

export interface BaseGroupModule extends BaseModule {
  count: number;
}

export interface SwitchModuleTemplate extends BaseModule {}

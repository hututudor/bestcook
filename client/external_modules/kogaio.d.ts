declare module '@ivoryio/kogaio' {
  const Typography: React.FC<any>;
  const Box: React.FC<any>;
  const Space: React.FC<any>;
  const Flex: React.FC<any>;
}

declare module '@ivoryio/kogaio/utils' {
  function themeGet(key: string): string;
  function buildTheme(obj: any): any;
}

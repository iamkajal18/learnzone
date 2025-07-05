export function withTheme(metadata: any, themeColor = '#ffffff') {
  return {
    ...metadata,
    viewport: {
      themeColor,
    },
  };
}

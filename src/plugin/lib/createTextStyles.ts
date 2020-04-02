function createTextStyle(name, fontName: FontName, fontSize: number = 12) {
  const localStyles = figma.getLocalTextStyles();
  const localStyle = localStyles.find(({ name: localName }) => localName === name);
  const textStyle = localStyle || figma.createTextStyle();
  if (!localStyle) textStyle.fontSize = fontSize;
  textStyle.fontName = fontName;
  textStyle.name = name;

  return textStyle;
}

export default async function createTextStyles() {
  const roboto = { family: 'Roboto', style: 'Regular' };
  const robotoBold = { ...roboto, style: 'Bold' };
  const robotoItalic = { ...roboto, style: 'Italic' };

  await Promise.all([
    figma.loadFontAsync(roboto),
    figma.loadFontAsync({ family: 'Roboto', style: 'Bold' }),
    figma.loadFontAsync({ family: 'Roboto', style: 'Italic' }),
  ]);

  const normal = createTextStyle('normal', roboto);
  const emphasis = createTextStyle('emphasis', robotoItalic);
  const strong = createTextStyle('strong', robotoBold);
  const heading1 = createTextStyle('heading/1', robotoBold, 36);
  const heading2 = createTextStyle('heading/2', robotoBold, 24);
  const heading3 = createTextStyle('heading/3', robotoBold, 16);
  const heading4 = createTextStyle('heading/4', robotoBold, 14);
  const blockquote = createTextStyle('blockquote', robotoItalic, 14);

  return {
    normal,
    emphasis,
    strong,
    blockquote,
    heading1,
    heading2,
    heading3,
    heading4,
  };
}

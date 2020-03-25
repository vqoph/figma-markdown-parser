function createTextStyle(name, fontName: FontName) {
  const localStyles = figma.getLocalTextStyles();
  const localStyle = localStyles.find(({ name: localName }) => localName === name);
  const textStyle = localStyle || figma.createTextStyle();
  textStyle.fontName = fontName;
  textStyle.name = name;
  return textStyle;
}

export default async function createTextStyles() {
  await Promise.all([
    figma.loadFontAsync({ family: 'Roboto', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Roboto', style: 'Bold' }),
    figma.loadFontAsync({ family: 'Roboto', style: 'Italic' }),
  ]);

  const normal = createTextStyle('normal', { family: 'Roboto', style: 'Regular' });
  const emphasis = createTextStyle('emphasis', {
    family: 'Roboto',
    style: 'Italic',
  });
  const strong = createTextStyle('strong', { family: 'Roboto', style: 'Bold' });
  const heading = createTextStyle('heading', { family: 'Roboto', style: 'Bold' });
  const blockquote = createTextStyle('blockquote', {
    family: 'Roboto',
    style: 'Bold',
  });

  return { normal, emphasis, strong, heading, blockquote };
}

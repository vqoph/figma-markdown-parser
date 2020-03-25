import createTextNode from './createTextNode';

export default function createRichTextNode(
  type: string,
  content: string,
  textStyles: any
): TextNode {
  const pattern = /\[(.*)\](.*)\[\/(.*)\]/gi;
  const cleanedContent = content.toString().replace(pattern, '$2');
  const text = createTextNode(cleanedContent);
  text.textStyleId = (textStyles[type] || textStyles.normal).id;

  [...content['matchAll'](pattern)].forEach(match => {
    const [initialString, style, contentString] = match;
    const startIndex = cleanedContent.indexOf(contentString);
    try {
      text.setRangeTextStyleId(
        startIndex,
        startIndex + contentString.length,
        textStyles[style].id
      );
    } catch (error) {
      throw Object.assign(error, {
        initialString,
        style,
        contentString,
        startIndex,
        end: startIndex + contentString.length,
      });
    }
  });

  return text;
}

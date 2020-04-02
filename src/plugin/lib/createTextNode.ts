export default function createTextNode(characters = '', textNode?: TextNode) {
  const text = textNode || figma.createText();
  text.resize(400, 1);
  text.textAutoResize = 'HEIGHT';
  text.characters = characters;
  return text;
}

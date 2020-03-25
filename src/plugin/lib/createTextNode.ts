export default function createTextNode(characters) {
  const text = figma.createText();
  text.resize(400, 1);
  text.textAutoResize = 'HEIGHT';
  text.characters = characters;
  return text;
}

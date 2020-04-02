export default function createFrame(items = [], itemSpacing = 10) {
  const frame: FrameNode = figma.createFrame();
  items.forEach(item => frame.appendChild(item));
  frame.resize(400, 1);
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = itemSpacing;
  frame.fills = [{ ...frame.fills[0], visible: false }];
  return frame;
}

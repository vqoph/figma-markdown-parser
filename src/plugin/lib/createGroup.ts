export default function createGroup(
  items: any[],
  parentFrame: FrameNode | GroupNode,
  name: string
): GroupNode {
  const group = figma.group(items, parentFrame);
  group.name = name;
  return group;
}

import createFrame from './createFrame';
import createRichTextNode from './createRichTextNode';
import dashify from 'dashify';
import createTextNode from './createTextNode';
import createGroup from './createGroup';

export default function nodeReducer(context: {
  textStyles: any;
  parentFrame: FrameNode | GroupNode;
  parentName?: string;
}) {
  const { textStyles, parentName, parentFrame } = context;

  return (accumulator, currentNode) => {
    const { type, children } = currentNode;
    let currentName = (parentName ? `${parentName}/` : '') + dashify(type);

    try {
      switch (type) {
        case 'text':
          return [...accumulator, currentNode.value];

        case 'link':
        case 'emphasis':
        case 'strong':
          const textContent = currentNode.value
            ? currentNode.value
            : children.reduce(nodeReducer(context), []).join('');
          return [...accumulator, `[${type}]${textContent}[/${type}]`];

        case 'break':
          return [...accumulator, '\n'];

        case 'heading':
        case 'paragraph':
          const textNode = createTextNode();
          if (type === 'heading') {
            const { depth } = currentNode;
            textNode.textStyleId = (
              textStyles['heading' + depth] || textStyles.normal
            ).id;
          }
          const content = children.reduce(nodeReducer(context), []).join('');

          const text = createRichTextNode(type, content, textStyles, textNode);
          return [...accumulator, createGroup([text], parentFrame, currentName)];

        case 'listItem':
          const listItemContent = children.reduce(nodeReducer({ ...context }), []);
          return [
            ...accumulator,
            createGroup(listItemContent, parentFrame, currentName),
          ];

        case 'list':
        case 'blockquote':
          const frame = createFrame();
          const items = children.reduce(
            nodeReducer({ ...context, parentName: currentName, parentFrame: frame }),
            []
          );
          frame.name = currentName;
          items.forEach(item => frame.appendChild(item));

          return [...accumulator, frame];

        default:
          throw new Error(`missing type: ${type}`);
      }
    } catch (e) {
      throw Object.assign(e, { currentNode });
    }
  };
}

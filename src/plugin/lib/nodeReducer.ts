import createTextNode from './createTextNode';
import createFrame from './createFrame';
import createRichTextNode from './createRichTextNode';

export default function nodeReducer(context: { textStyles?: any } = {}) {
  return (accumulator, currentNode) => {
    let text: TextNode;
    const { type } = currentNode;
    const { textStyles } = context;

    try {
      switch (type) {
        case 'text':
          return [...accumulator, currentNode.value];

        case 'emphasis':
        case 'strong':
          const textContent = currentNode.value
            ? currentNode.value
            : currentNode.children.reduce(nodeReducer({ ...context }), []).join('');
          return [...accumulator, `[${type}]${textContent}[/${type}]`];

        case 'break':
          return [...accumulator, '\n'];

        case 'heading':
        case 'paragraph':
          const content = currentNode.children
            .reduce(nodeReducer({ ...context }), [])
            .join('');
          text = createRichTextNode(type, content, textStyles);
          return [...accumulator, text];

        case 'list':
        case 'blockquote':
        case 'listItem':
          const items = currentNode.children.reduce(nodeReducer(context), []);
          const frame = createFrame(items);
          return [...accumulator, frame];

        default:
          throw new Error(`missing type: ${type}`);
      }
    } catch (e) {
      throw Object.assign(e, { currentNode });
    }
  };
}

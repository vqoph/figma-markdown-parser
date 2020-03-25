import unified from 'unified';
import markdown from 'remark-parse';
figma.showUI(__html__);

function mdParse(content): any {
  return unified()
    .use(markdown, { commonmark: true })
    .parse(content);
}

//  .use(remark2rehype)
//  .use(html)

function createFrame(items, itemSpacing = 10) {
  const frame = figma.createFrame();
  items.forEach(item => frame.appendChild(item));
  frame.resize(400, 1);
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = itemSpacing;
  frame.fills = [{ ...frame.fills[0], visible: false }];
  return frame;
}

function createTextNode(characters) {
  const text = figma.createText();
  text.resize(400, 1);
  text.textAutoResize = 'HEIGHT';
  text.characters = characters;
  return text;
}

function nodeReducer(
  params: { textWidth: number; yValue?: number } = {
    textWidth: 200,
  }
) {
  return (accumulator, currentNode, currentIndex) => {
    let text: TextNode;
    const { type } = currentNode;
    try {
      switch (type) {
        case 'text':
          return [...accumulator, currentNode.value];

        case 'emphasis':
        case 'strong':
          const textContent = currentNode.value
            ? currentNode.value
            : currentNode.children.reduce(nodeReducer({ ...params }), []).join('');
          return [...accumulator, `[${type}]${textContent}[/${type}]`];

        case 'break':
          return [...accumulator, '\n'];

        case 'heading':
        case 'paragraph':
          const content = currentNode.children
            .reduce(nodeReducer({ ...params }), [])
            .join('');
          const pattern = /(\[(.*)\].*\[\/(.*)\])/gi;
          const matches = content.match(pattern);
          text = createTextNode(content);
          text.textStyleId = type + '-' + currentNode.depth;
          return [...accumulator, text];

        case 'list':
        case 'blockquote':
        case 'listItem':
          const items = currentNode.children.reduce(nodeReducer(params), []);

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

figma.ui.onmessage = msg => {
  if (msg.type === 'mi-parse-file') {
    (async () => {
      await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
      try {
        const content = mdParse(msg.content).children;
        const items = content.reduce(nodeReducer({ textWidth: 300 }), []);
        const frame = createFrame(items);
        frame.itemSpacing = 10;
        figma.currentPage.selection.slice().push(frame);
      } catch (e) {
        console.error(e);
      }
    })();
  }

  if (msg.type === 'mi-close-plugin') {
    figma.closePlugin();
  }

  if (msg.type === 'mi-error') {
    console.error(msg);
    figma.closePlugin();
  }
};

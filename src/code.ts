import { defaultBlockParse as mdParse } from 'simple-markdown';
figma.showUI(__html__);

function nodeReducer(accumulator, currentNode, currentIndex) {
  switch (currentNode.type) {
    case 'text':
      const text = figma.createText();
      text.characters = currentNode.content;
      text.y = currentIndex * 20;
      break;
    default:
      if (currentNode.content) {
        return currentNode.content.reduce(nodeReducer);
      }
      break;
  }
  return accumulator;
}

figma.ui.onmessage = msg => {
  if (msg.type === 'mi-parse-file') {
    (async () => {
      const content = mdParse(msg.content);
      await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
      console.log(content.reduce(nodeReducer));
    })();
  }

  if (msg.type === 'mi-close-plugin') {
    figma.closePlugin();
  }

  if (msg.type === 'mi-error') {
    console.log(msg);
    figma.closePlugin();
  }
};

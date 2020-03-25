import parseFile from './lib/parseFile';

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'mi-parse-file') {
    parseFile(msg);
  }

  if (msg.type === 'mi-close-plugin') {
    figma.closePlugin();
  }

  if (msg.type === 'mi-error') {
    console.error(msg);
    figma.closePlugin();
  }
};

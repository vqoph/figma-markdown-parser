import createTextStyles from './createTextStyles';
import mdParse from './mdParse';
import nodeReducer from './nodeReducer';
import createFrame from './createFrame';

export default async function parseFile(msg) {
  const textStyles = await createTextStyles();
  try {
    const content = mdParse(msg.content).children;
    const items = content.reduce(nodeReducer({ textStyles }), []);
    const frame = createFrame(items);
    frame.itemSpacing = 10;
    figma.currentPage.selection.slice().push(frame);
  } catch (e) {
    console.error(e);
  }
}

import createTextStyles from '../lib/createTextStyles';
import mdParse from '../lib/mdParse';
import nodeReducer from '../lib/nodeReducer';
import createFrame from '../lib/createFrame';

export default async function parseFile(msg) {
  try {
    const textStyles = await createTextStyles();

    const content = mdParse(msg.content).children;
    const frame = createFrame();
    const items = content.reduce(
      nodeReducer({ textStyles, parentFrame: frame }),
      []
    );

    items.forEach(item => frame.appendChild(item));
    frame.itemSpacing = 10;
    figma.currentPage.selection.slice().push(frame);
    frame.name = msg.name;
  } catch (e) {
    console.error(e);
  }
}

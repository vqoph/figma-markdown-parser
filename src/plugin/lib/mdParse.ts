import unified from 'unified';
import markdown from 'remark-parse';

export default function mdParse(content): any {
  return unified()
    .use(markdown, { commonmark: true })
    .parse(content);
}

export default async function markdownFileUpload(file) {
  console.log('markdownFileUpload');
  return new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.onload = ({ target }: any) => resolve(target.result);
    reader.readAsText(file);
  });
}

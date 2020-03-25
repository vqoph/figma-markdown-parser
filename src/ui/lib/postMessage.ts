export default function postMessage(type: string, params?: any) {
  parent.postMessage({ pluginMessage: { type, ...params } }, '*');
}

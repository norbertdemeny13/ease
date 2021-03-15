export const copyToClipboard = (value: string) => {
  const aux = document.createElement('input');
  aux.style.opacity = '0';
  aux.setAttribute('value', value);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
};

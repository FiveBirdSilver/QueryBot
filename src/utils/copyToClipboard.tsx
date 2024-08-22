import removeMd from "remove-markdown";

const copyToClipboard = (text: string) => {
  const plainText = removeMd(text);
  navigator.clipboard.writeText(plainText);
};

export default copyToClipboard;

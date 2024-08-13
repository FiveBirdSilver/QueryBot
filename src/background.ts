chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "open_side_panel") {
    if (sender.tab && sender.tab.id) {
      console.log("Success", sender);
      try {
        await chrome.sidePanel.open({ tabId: sender.tab.id });
        await chrome.tabs.sendMessage(sender.tab.id, { success: true });
      } catch (error) {
        console.error("Error", error);
        await chrome.tabs.sendMessage(sender.tab.id, { success: false, errorMessage: error });
      }
      return true;
    } else {
      sendResponse({ success: false });
      return false;
    }
  }
});
export {};
